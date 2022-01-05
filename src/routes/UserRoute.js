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

export default router;
