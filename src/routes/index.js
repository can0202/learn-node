import user from "./user";
import auth from "./auth";

import { notFound } from "../middlewares/handle_errors";

const initRoutes = (app) => {
  // router user
  app.use("/api/v1/user", user);
  // router auth
  app.use("/api/v1/auth", auth);

  // init router return err not found
  app.use(notFound);
  // return app.use("/", (req, res) => {
  //   return res.send("SERVER ONNNNN");
  // });
};

module.exports = initRoutes;
