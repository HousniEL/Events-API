import UserRoute from "../src/routes/UserRoute.js";
import EventRoute from "../src/routes/EventRoute.js";

import HttpError from "../system/helpers/HttpError.js";

export default (server) => {
  // Api route
  server.use("/api/user", UserRoute);
  server.use("/api/event", EventRoute);

  // If no route matches. Send a 404 page
  server.get("*", (req, res) => {
    const err = new Error("Requested path does not exist!");
    const statusCode = 404;
    return res.status(statusCode).json(new HttpError(err));
  });
};
