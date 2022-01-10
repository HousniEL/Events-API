import express from "express";
import multer from "multer";

import EventController from "../controllers/EventController.js";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const route = express.Router();

route.get("/", EventController.getAll);
route.post("/", EventController.insert);
route.post("/upload", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!",
  });
});
route.put("/:id", EventController.update);
route.delete("/:id", EventController.delete);

export default route;
