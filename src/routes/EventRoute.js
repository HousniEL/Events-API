import express from "express";
import EventController from "../controllers/EventController.js";

const route = express.Router();

route.get('/', EventController.getAll);
route.post('/', EventController.insert);
route.put('/:id', EventController.update);
route.delete('/:id', EventController.delete);

export default route;