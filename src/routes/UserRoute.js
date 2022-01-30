import express from "express";
import UserController from "../controllers/UserController.js";
//import { JwtMiddleware } from '../middlewares/JWTMiddleware.js';

const router = express.Router();

router.post("/openid", UserController.openid);
router.post("/signup", UserController.insert);
router.post("/signin", UserController.signin);
router.post("/signout", UserController.signout);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.post("/infos", UserController.get);
router.post("/addFavoris", UserController.addFavoris);
router.post("/deleteFavoris", UserController.deleteFavoris);
router.post("/addEvent", UserController.addEvent);
router.post("/deleteEvent", UserController.deleteEvent);
router.post("/getSomeUserInfo", UserController.getSomeUserInfo);

export default router;
