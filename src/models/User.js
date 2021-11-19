import mongoose from 'mongoose';
const { Schema } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';

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
            age: {
                type: Number,
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