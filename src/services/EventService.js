import Service from "./Service.js";

class EventService extends Service {
    constructor(model){
        super(model);
        this.get = this.get.bind(this);

    }
    async get(data) {
        var response = await this.model.findOne({ _id: data.id });
        if (response) {
          return {
              error:false,
              statusCode:200,
              evenement:response
          };
        } else {
          return {
              error:true,
              statusCode:500,
              message:"not found"
          };
        }
      }
    
}

export default EventService;