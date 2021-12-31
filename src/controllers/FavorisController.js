import Controller from "./Controller.js";
import FavorisService from "../services/FavorisService.js";
import Favoris from "../models/Favoris.js";

const favorisService = new FavorisService(
    new Favoris().getInstance()
);

class FavorisController extends Controller {
    constructor(service){
        super(service);
    }
}

export default new FavorisController(favorisService);