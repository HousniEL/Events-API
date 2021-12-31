import express from "express";
import EventTagsController from "../controllers/EventTagsController.js";

const route = express.Router();

route.get('/', EventTagsController.getAll);
route.post('/', EventTagsController.insert);
route.put('/:id', EventTagsController.update);
route.delete('/:id', EventTagsController.delete);

export default route;