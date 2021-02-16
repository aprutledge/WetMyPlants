const { checkEmail, checkDupUsername } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [checkDupUsername, checkEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/token", controller.refresh);

  app.delete("/api/auth/logout", controller.signout);

  // app.get("/api/auth/check", controller.check);
};
