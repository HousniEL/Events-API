import Service from "./Service.js";
import crypto from "crypto";

class UserService extends Service {
    constructor(model){
        super(model);
    }
    async insert(data){
        data.password = crypto.pbkdf2Sync(data.password, process.env.SALT, 1000, 64, `sha512`).toString(`hex`); 
        try {
            let item = await this.model.create(data);
            if (item)
                return {
                    error: false,
                    statusCode: 202,
                    item
                };
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to create item",
                errors: error.errors
            };
        }
    }

    async signin(data){
        var message;
        this.model.findOne({
            username: data.email
        }).exec((err, user) => {
            if (err) {
                message = {
                    error: true,
                    statusCode: 500,
                    message: err.err,
                    errors: err.errors
                }
                return;
            }
            if (user) {
                message = {
                    error: false,
                    statusCode: 202,
                    user
                };
                return;
            }    
        });
        return message;
    }

}

export default UserService;