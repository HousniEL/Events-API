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
    this.get = this.get.bind(this);
    this.addFavoris = this.addFavoris.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.getSomeUserInfo = this.getSomeUserInfo.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
    this.checkParticipation = this.checkParticipation.bind(this);
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
      delete item["password"];
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
    var response = await this.model.findOne(
      { email: data.email },
      { password: 0 }
    );
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

  async get(data) {
    //recupere donnees user
    var response = await this.model.findOne({ _id: data.id }, { password: 0 });
    if (response) {
      return {
        error: false,
        statusCode: 200,
        user: response,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "not found",
      };
    }
  }

  async addFavoris(data) {
    try {
      if (!data.plus) {
        var response = await this.model.updateOne(
          { _id: data.userId },
          { $pull: { favoris: data.eventId } }
        );
      } else {
        var response = await this.model.updateOne(
          { _id: data.userId },
          { $addToSet: { favoris: data.eventId } }
        );
      }
      if (response) {
        return {
          error: false,
          statusCode: 200,
        };
      } else {
        return {
          error: true,
          statusCode: 500,
          message: "not found",
        };
      }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e.message,
      };
    }
  }

  async addEvent(data) {
    //addeventtouser
    try {
      var response = await this.model.updateOne(
        { _id: data.userId },
        { $addToSet: { events: data.eventId } } //push l'event to user en evitant redandance(verifie si existe deja)
      );

      if (response) {
        return {
          error: false,
          statusCode: 200,
        };
      } else {
        return {
          error: true,
          statusCode: 500,
          message: "not found",
        };
      }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e.message,
      };
    }
  }

  async deleteEvent(data) {
    //delete event from user
    try {
      var response = await this.model.updateOne(
        { _id: data.userId },
        { $pull: { events: data.eventId } }
      );
      if (response) {
        return {
          error: false,
          statusCode: 200,
        };
      } else {
        return {
          error: true,
          statusCode: 500,
          message: "not found",
        };
      }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e.message,
      };
    }
  }

  async checkFavorite(data) {
    //verifie si c favori déjà
    var response = await this.model.findOne({
      _id: data.userId,
      favoris: { $elemMatch: { $eq: data.eventId } },
    });
    if (response) {
      return {
        error: false,
        statusCode: 200,
      };
    }
    return {
      error: true,
      statusCode: 500,
    };
  }
  async checkParticipation(data) {
    //verifie si c participé déjà
    var response = await this.model.findOne({
      _id: data.userId,
      events: { $elemMatch: { $eq: data.eventId } },
    });
    if (response) {
      return {
        error: false,
        statusCode: 200,
      };
    }
    return {
      error: true,
      statusCode: 500,
    };
  }

  async getSomeUserInfo(data) {
    var response = await this.model.findOne({ _id: data.id }, { password: 0 });
    if (response) {
      var resp = { ...response._doc };
      resp["nbrFavoris"] = response.favoris ? response.favoris.length : 0;
      resp["nbrEvents"] = response.events ? response.events.length : 0;
      delete resp["favoris"];
      delete resp["events"];
      return {
        error: false,
        statusCode: 200,
        user: resp,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "not found",
      };
    }
  }

  async checkFavorite(data) {
    var response = await this.model.findOne({
      _id: data.userId,
      favoris: { $elemMatch: { $eq: data.eventId } },
    });
    if (response) {
      return {
        error: false,
        statusCode: 200,
      };
    }
    return {
      error: true,
      statusCode: 500,
    };
  }
}

export default UserService;
