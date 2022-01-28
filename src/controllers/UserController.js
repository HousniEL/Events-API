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
        this.openid = this.openid.bind(this);
        this.get=this.get.bind(this)
        this.addFavoris=this.addFavoris.bind(this)
    }
    
    async signin(req, res) {
        const response = await this.service.signin(req.body);
        return res.status(response.statusCode).send(response);
    }

    async signout(req, res){
        const response = await this.service.signout(req.body);
        return res.status(response.statusCode).send(response);
    }

    async openid(req, res){
        const response = await this.service.openid(req.body);
        return res.status(response.statusCode).send(response);
    }
    async get(req, res){
        const response = await this.service.get(req.body);
        return res.status(response.statusCode).send(response);
    }
    async addFavoris(req, res){
        const response = await this.service.addFavoris(req.body);
        return res.status(response.statusCode).send(response);
    }
    

};

export default new UserController(userService);