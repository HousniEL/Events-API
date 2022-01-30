import Service from "./Service.js";

class EventService extends Service {
  constructor(model) {
    super(model);
    this.get = this.get.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.newGuest = this.newGuest.bind(this);
  }

  async get(data) {
    var response = await this.model.findOne({ _id: data.id });
    if (response) {
      return {
        error: false,
        statusCode: 200,
        evenement: response,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "not found",
      };
    }
  }

  async getUserEvents(data) {
    var response = await this.model.find(
      { idOrganisateur: data.userId },
      { _id: 1 }
    );
    if (response) {
      return {
        error: false,
        statusCode: 200,
        evenement: response,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "not found",
      };
    }
  }

  async newGuest(data) {
    var response = await this.model.updateOne(
      { _id: data.eventId, nbrplace: { $gt: 0 } },
      {
        $inc: { nbrplace: -1 },
      }
    );
    if (response.modifiedCount != 0) {
      return {
        error: false,
        statusCode: 200,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "All places are booked",
      };
    }
  }
}

export default EventService;
