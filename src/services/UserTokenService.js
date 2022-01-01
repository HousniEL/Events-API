import Service from "./Service.js";

class UserTokenService extends Service {
    constructor(model){
        super(model);
    }

    async getAll(data){
        var response = await this.model.findOne({ userid: data.id });
        if(response){
            return {
                id: response._id, 
            }
        }
        return {
            error: true,
            status: 500,
            message: "Unauthorized user.",
        }
    }

}

export default UserTokenService;