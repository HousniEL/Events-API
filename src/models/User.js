import mongoose from 'mongoose';

const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

class User{
    initSchema(){
        const schema = new Schema({
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                required: true,
                validate: [ validateEmail, 'Please fill a valid email address'],
            },
            password: {
                type: String,
                required: true,
            },
        });
        schema.plugin(uniqueValidator);
        mongoose.model('users', schema);
    }

    getInstance(){
        this.initSchema();
        return mongoose.model("users");
    }
}

export default User;