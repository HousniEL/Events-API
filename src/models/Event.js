import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

class Event{
    initSchema(){
        const schema = new Schema({
            dateDebut: {
                type: Date,
                required: true,
            },
            dateFin: {
                type: String,
                required: true,
            },
            titre: {
                type: String,
                required: true,
            },
            description: {
                type: String,
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
            prix: {
                type: Number,
                required: true,
                default: null,
            },
            idOrganisateur: {
                type: String,
                required: true,
            },
            lat: {
                type: String,
                required: true,
            },
            lng: {
                type: String,
                required: true,
            },
            dateCreation: {
                type: Date,
                required: true,
            },
        }, {
            writeConcern: {
                w: "majority",
                j: true,
                wtimeout: 1000,
            }
        });
        schema.plugin(uniqueValidator);
        mongoose.model('events', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("events");
    }
}

export default Event;