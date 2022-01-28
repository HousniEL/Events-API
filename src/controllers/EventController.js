import Controller from "./Controller.js";
import EventService from "../services/EventService.js";
import Event from "../models/Event.js";

const eventService = new EventService(
    new Event().getInstance()
);

class EventController extends Controller {
    constructor(service){
        super(service);
        this.get=this.get.bind(this);
    }
    async get(req, res) {
        const response = await this.service.get(req.body);
        return res.status(response.statusCode).send(response);
    }
}


export default new EventController(eventService);