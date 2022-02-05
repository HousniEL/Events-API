import Service from "./Service.js";

class EventService extends Service {
  constructor(model) {
    super(model);
    this.getEventsInfo = this.getEventsInfo.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.newGuest = this.newGuest.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
    this.getEventPlanning = this.getEventPlanning.bind(this);
    this.getNbrOfPages = this.getNbrOfPages.bind(this);
  }

  async getEventsInfo(data) {
    var response = await this.model
      .find({}, { _id: 1, title: 1, tags: 1, schedule: 1, price: 1, images: 1 })
      .sort({ dateCreation: -1 })
      .skip(data.pageNumber > 0 ? (data.pageNumber - 1) * data.nPerPage : 0)
      .limit(data.nPerPage);

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

  async getEvent(data) {
    //recuperation info event
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
    //recuperation user info
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
    //decrementation nb place
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

  async removeGuest(data) {
    //incrementer nb place
    var response = await this.model.updateOne(
      { _id: data.eventId, nbrplace: { $gt: 0 } },
      {
        $inc: { nbrplace: 1 },
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

  async getEventPlanning(data) {
    var response = await this.model.findOne(
      { _id: data.eventId },
      { schedule: 1 }
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

  async getNbrOfPages() {
    var response = await this.model.find({}).count();

    return {
      error: false,
      statusCode: 200,
      nbrPages: Math.ceil(response / 2),
    };
  }
}

export default EventService;
