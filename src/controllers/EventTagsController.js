import Controller from "./Controller.js";
import EventTagsService from "../services/EventTagsService.js";
import EventTags from "../models/EventTags.js";

const eventTagsService = new EventTagsService(
    new EventTags().getInstance()
);

class EventTagsController extends Controller {
    constructor(service){
        super(service);
    }
}

export default new EventTagsController(eventTagsService);