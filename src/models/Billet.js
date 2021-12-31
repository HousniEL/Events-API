import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

class Billet{
    initSchema(){
        const schema = new Schema({
            idUser: {
                type: String,
                required: true,
            },
            idEvenement: {
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
        mongoose.model('billets', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("billets");
    }
}

export default Billet;