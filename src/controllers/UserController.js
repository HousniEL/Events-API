import UserService from "../services/UserService.js";
import User from "../models/User.js";
import Controller from "./Controller.js";

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.openid = this.openid.bind(this);
    this.get = this.get.bind(this);
    this.addFavoris = this.addFavoris.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.getSomeUserInfo = this.getSomeUserInfo.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
    this.checkParticipation = this.checkParticipation.bind(this);
  }

  async signin(req, res) {
    const response = await this.service.signin(req.body);
    return res.status(response.statusCode).send(response);
  }

  async signout(req, res) {
    const response = await this.service.signout(req.body);
    return res.status(response.statusCode).send(response);
  }

  async openid(req, res) {
    const response = await this.service.openid(req.body);
    return res.status(response.statusCode).send(response);
  }

  async get(req, res) {
    const response = await this.service.get(req.body);
    return res.status(response.statusCode).send(response);
  }

  async addFavoris(req, res) {
    const response = await this.service.addFavoris(req.body);
    return res.status(response.statusCode).send(response);
  }

  async addEvent(req, res) {
    const response = await this.service.addEvent(req.body);
    return res.status(response.statusCode).send(response);
  }

  async deleteEvent(req, res) {
    const response = await this.service.deleteEvent(req.body);
    return res.status(response.statusCode).send(response);
  }

  async getSomeUserInfo(req, res) {
    const response = await this.service.getSomeUserInfo(req.body);
    return res.status(response.statusCode).send(response);
  }

  async checkFavorite(req, res) {
    const response = await this.service.checkFavorite(req.body);
    return res.status(response.statusCode).send(response);
  }

  async checkParticipation(req, res) {
    const response = await this.service.checkParticipation(req.body);
    return res.status(response.statusCode).send(response);
  }
}

export default new UserController(userService);
