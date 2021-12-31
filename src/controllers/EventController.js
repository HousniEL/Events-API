import Controller from "./Controller.js";
import EventService from "../services/EventService.js";
import Event from "../models/Event.js";

const eventService = new EventService(
    new Event().getInstance()
);

class EventController extends Controller {
    constructor(service){
        super(service);
    }
}

export default new EventController(eventService);