import Controller from "./Controller.js";
import UserService from "../services/UserService.js";
import User from "../models/User.js";

const userService = new UserService(
    new User().getInstance()
);

class UserController extends Controller{
    constructor(service){
        super(service);
    }

    async signin(req, res) {
        const response = await this.service.signin(req.body);
        return res.status(response.statusCode).send(response);
    }

};

export default new UserController(userService);