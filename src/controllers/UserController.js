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
};

export default new UserController(userService);