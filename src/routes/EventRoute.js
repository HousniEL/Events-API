<<<<<<< HEAD
import express from "express";
import fs from "fs";
=======
import express, { request } from "express";
import multer from "multer";
>>>>>>> 3c0656c6e345d83d9a8023770af95b675e3bf3e7

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
route.get("/test",(req,res)=>{
  res.status(200).json(
    {message:"bonjour"}  )
})
route.post("/infos", EventController.get);
export default route;
