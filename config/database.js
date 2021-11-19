import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

class Connection{
    constructor(){
        const url = process.env.MONGO_URL;
        mongoose.Promise = global.Promise;
        mongoose.connect(url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

export default new Connection();