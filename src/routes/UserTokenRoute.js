import express from "express";
import UserTokenController from "../controllers/UserTokenController.js";

const route = express.Router();

route.get('/', UserTokenController.getAll);
route.post('/', UserTokenController.insert);
route.put('/:id', UserTokenController.update);
route.delete('/:id', UserTokenController.delete);

export default route;