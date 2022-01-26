import express from "express";
import fs from "fs";

import EventController from "../controllers/EventController.js";

const route = express.Router();

route.get("/", EventController.getAll);
route.post("/", EventController.insert);
route.post("/upload", (req, res) => {
  var dir = "uploads/" + req.body.rep;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for (let img of req.body.imgs) {
    fs.writeFile(
      `uploads/${req.body.rep}/${img.name}.jpg`,
      img.imgsource,
      "base64",
      (err) => {
        if (err) {
          console.log(err);
          res.json({
            error: true,
            message: "Unable to upload images.",
          });
        }
      }
    );
  }
  res.json({
    message: "Done",
  });
});

route.put("/:id", EventController.update);
route.delete("/:id", EventController.delete);

export default route;
