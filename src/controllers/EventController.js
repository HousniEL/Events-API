import Controller from "./Controller.js";
import EventService from "../services/EventService.js";
import Event from "../models/Event.js";

const eventService = new EventService(new Event().getInstance());

class EventController extends Controller {
  constructor(service) {
    super(service);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.newGuest = this.newGuest.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
    this.getEvent = this.getEvent.bind(this);
  }

  async getEvent(req, res) {
    const response = await this.service.getEvent(req.body);
    return res.status(response.statusCode).send(response);
  }

  async getUserEvents(req, res) {
    const response = await this.service.getUserEvents(req.body);
    return res.status(response.statusCode).send(response);
  }

  async newGuest(req, res) {
    const response = await this.service.newGuest(req.body);
    return res.status(response.statusCode).send(response);
  }
  async removeGuest(req, res) {
    const response = await this.service.removeGuest(req.body);
    return res.status(response.statusCode).send(response);
  }
}

export default new EventController(eventService);
