import express from "express";
import fs, { read } from "fs";

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
route.post("/infos", EventController.getEvent);
route.post("/user", EventController.getUserEvents);
route.post("/addGuest", EventController.newGuest);
route.post("/removeGuest", EventController.removeGuest);

route.post("/images", (req, res) => {
  readFile(
    req.body.rep,
    req.body.imgs,
    0,
    [], // ici se stocke le resultat qui est des images en binaires
    (err) => {
      res.status(500).json(err);
    },
    (result) => {
      res.status(200).json(result);
    }
  );
});

function readFile(rep, array, index, images, error, success) { //rep=dossier name, 
  if (index < array.length) {
    fs.readFile(`uploads/${rep}/${array[index]}.jpg`, "base64", (err, data) => {//Array tableau d'images, 
      //cette fct permet de passer les images au front en le convertissanr en binaire ,le front lit le fichier binaire automatiquement
      if (err) {
        return error({
          error: true,
          message: err.message,
        });
      }
      images.push(data);
      readFile(rep, array, index + 1 , images, error, success);//index+1 pour passer al'image prochaine
    });
  } else {
    return success({ images });
  }
}

export default route;
