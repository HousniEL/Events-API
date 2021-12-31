import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

class EventTags{
    initSchema(){
        const schema = new Schema({
            eventId: {
                type: String,
                required: true,
            },
            tags: {
                type: Object,
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
        mongoose.model('eventtags', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("eventtags");
    }
}

export default EventTags;