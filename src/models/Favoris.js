import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

class Favoris{
    initSchema(){
        const schema = new Schema({
            idUser: {
                type: String,
                required: true,
            },
            idEvent: {
                type: String,
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
        mongoose.model('favoris', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("favoris");
    }
}

export default Favoris;