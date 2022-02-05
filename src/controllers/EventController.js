import Controller from "./Controller.js";
import EventService from "../services/EventService.js";
import Event from "../models/Event.js";

const eventService = new EventService(new Event().getInstance());

class EventController extends Controller {
  constructor(service) {
    super(service);
    this.getEvent = this.getEvent.bind(this);
    this.getEventsInfo = this.getEventsInfo.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.newGuest = this.newGuest.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
    this.getEventPlanning = this.getEventPlanning.bind(this);
    this.getNbrOfPages = this.getNbrOfPages.bind(this);
  }

  async getEvent(req, res) {
    const response = await this.service.getEvent(req.body);
    return res.status(response.statusCode).send(response);
  }

  async getEventsInfo(req, res) {
    const response = await this.service.getEventsInfo(req.body);
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
  async getEventPlanning(req, res) {
    const response = await this.service.getEventPlanning(req.body);
    return res.status(response.statusCode).send(response);
  }
  async getNbrOfPages(req, res) {
    const response = await this.service.getNbrOfPages();
    return res.status(response.statusCode).send(response);
  }
}

export default new EventController(eventService);
