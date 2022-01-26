import mongoose from "mongoose";

const { Schema } = mongoose;

import uniqueValidator from "mongoose-unique-validator";

class Event {
  initSchema() {
    const schema = new Schema(
      {
        idOrganisateur: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: Object,
          required: true,
        },
        images: {
          type: Object,
          required: true,
        },
        nbrplace: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: null,
        },
        location: {
          type: Object,
          required: true,
        },
        tags: {
          type: Array,
          required: true,
        },
        schedule: {
          type: Object,
          required: true,
        },
        dateCreation: {
          type: Date,
          required: true,
        },
      },
      {
        writeConcern: {
          w: "majority",
          j: true,
          wtimeout: 1000,
        },
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model("events", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("events");
  }
}

export default Event;
