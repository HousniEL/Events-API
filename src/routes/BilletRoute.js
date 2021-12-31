import express from "express";
import BilletController from "../controllers/BilletController.js";

const route = express.Router();

route.get('/', BilletController.getAll);
route.post('/', BilletController.insert);
route.put('/:id', BilletController.update);
route.delete('/:id', BilletController.delete);

export default route;