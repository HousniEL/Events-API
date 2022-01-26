import express from "express";
import cors from "cors";

import setRoutes from "./routes.js";

const server = express();

// parse requests of content-type - application/json
server.use(express.json({ limit: "15MB" }));
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(cors());

setRoutes(server);

export default server;
