import Controller from "./Controller.js";
import BilletService from "../services/BilletService.js";
import Billet from "../models/Billet.js";

const billetService = new BilletService(
    new Billet().getInstance()
);

class BilletController extends Controller {
    constructor(service){
        super(service);
    }
}

export default new BilletController(billetService);