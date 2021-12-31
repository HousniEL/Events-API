import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

class UserToken{
    initSchema(){
        const schema = new Schema({
            userid: {
                type: String,
                required: true,
            },
            token: {
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
        mongoose.model('userstoken', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("userstoken");
    }
}

export default UserToken;