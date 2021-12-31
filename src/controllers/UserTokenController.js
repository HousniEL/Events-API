import Controller from "./Controller.js";
import UserTokenService from "../services/UserTokenService.js";
import UserToken from "../models/UserToken.js";


const userTokenService = new UserTokenService(
    new UserToken().getInstance()
);

class UserTokenController extends Controller{
    constructor(service){
        super(service);
    }
};

export default new UserTokenController(userTokenService);