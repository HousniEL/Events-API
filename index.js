import dotenv from "dotenv";
dotenv.config();

import server from "./config/server.js";

import "./config/database.js";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Listening to port 5000");
});
