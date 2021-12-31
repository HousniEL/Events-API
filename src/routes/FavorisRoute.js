import express from "express";
import FavorisController from "../controllers/FavorisController.js";

const route = express.Router();

route.get('/', FavorisController.getAll);
route.post('/', FavorisController.insert);
route.put('/:id', FavorisController.update);
route.delete('/:id', FavorisController.delete);

export default route;