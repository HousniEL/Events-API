import express from "express";

import setRoutes from "./routes.js";

const server = express();

// parse requests of content-type - application/json
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

setRoutes(server);

export default server;
