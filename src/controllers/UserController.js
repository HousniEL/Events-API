import UserService from "../services/UserService.js";
import User from "../models/User.js";
import Controller from "./Controller.js";

const userService = new UserService(
    new User().getInstance()
);

class UserController extends Controller {

    constructor(service){
        super(service);
        this.signin = this.signin.bind(this);
        this.signout = this.signout.bind(this);
    }
    
    async signin(req, res) {
        const response = await this.service.signin(req.body);
        return res.status(response.statusCode).send(response);
    }

    async signout(req, res){
        const response = await this.service.signout(req.body);
        return res.status(response.statusCode).send(response);
    }

};

export default new UserController(userService);