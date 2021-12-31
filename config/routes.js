import UserRoute from '../src/routes/UserRoute.js';
import UserTokenRoute from '../src/routes/UserTokenRoute.js';
import EventRoute from '../src/routes/EventRoute.js';
import EventTagsRoute from '../src/routes/EventTagsRoute.js';
import BilletRoute from '../src/routes/BilletRoute.js';
import FavorisRoute from '../src/routes/FavorisRoute.js';

import HttpError from '../system/helpers/HttpError.js';

export default (server) => {

  // Api route
  server.use("/api/user", UserRoute);
  server.use("/api/usertoken", UserTokenRoute);
  server.use("/api/event", EventRoute);
  server.use("/api/eventtags", EventTagsRoute);
  server.use("/api/billet", BilletRoute);
  server.use("/api/favoris", FavorisRoute);
  

  // If no route matches. Send a 404 page
  server.get('*', (req, res) => {
    const err = new Error("Requested path does not exist!");
    const statusCode = 404;
    return res.status(statusCode).json(new HttpError(err));
  });

}