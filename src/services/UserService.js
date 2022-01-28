import Service from "./Service.js";
import UserTokenService from "./UserTokenService.js";
import UserToken from "../models/UserToken.js";
import crypto from "crypto";
import { getAccessToken } from "./JWTService.js";

class UserService extends Service {
  constructor(model) {
    super(model);
    this.signin = this.signin.bind(this);
    this.openid = this.openid.bind(this);
    this.insertToken = this.insertToken.bind(this);
    this.userTokenService = new UserTokenService(new UserToken().getInstance());
  }

  async insertToken(id, token = null) {
    if (!token) token = getAccessToken(JSON.stringify({ id: id }));
    await this.userTokenService.insert({
      userid: id,
      token: token,
    });
    return token;
  }

  async insert(data, token = null) {
    if (!token) {
      data.password = crypto
        .pbkdf2Sync(data.password, process.env.SALT, 1000, 64, `sha512`)
        .toString(`hex`);
    }
    try {
      let item = await this.model.create(data);
      if (item) {
        var token = await this.insertToken(item._id, token);
        return {
          error: false,
          statusCode: 202,
          response: {
            user: item,
            token: token,
          },
        };
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors,
      };
    }
  }

  async signin(data, token = null) {
    var response = await this.model.findOne({ email: data.email }).exec();
    if (response) {
      if (!response.account) {
        var token = await this.insertToken(response._id, token);
        var hash = crypto
          .pbkdf2Sync(data.password, process.env.SALT, 1000, 64, `sha512`)
          .toString(`hex`);
        if (hash === response.password) {
          return {
            error: false,
            statusCode: 202,
            response: {
              user: response,
              token: token,
            },
          };
        }
      }
      if (response.account && token) {
        var token = await this.insertToken(response._id, token);
        return {
          error: false,
          statusCode: 202,
          response: {
            user: response,
            token: token,
          },
        };
      }
    }
    return {
      error: true,
      statusCode: 500,
      message: "Incorrect email or password.",
    };
  }

  async signout(data) {
    var response = await this.model.findOne({ _id: data.id });
    if (response) {
      var token = await this.userTokenService.getAll({ id: response._id });
      if (!token.error) {
        await this.userTokenService.delete({ _id: token.id });
      }
      return {
        error: false,
        statusCode: 202,
        message: "Done",
      };
    }
    return {
      error: true,
      statusCode: 500,
      message: "Unknown user.",
    };
  }

  async openid(data) {
    var response = await this.model.findOne({ email: data.email });
    data.password = "";
    if (response) {
      return this.signin(data, data.token);
    } else {
      return this.insert(data, data.token);
    }
  }
}

export default UserService;
