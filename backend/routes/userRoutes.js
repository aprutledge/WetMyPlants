const jwt = require("jsonwebtoken");
const plantController = require("../controllers/plantController");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/plants", plantController.getPlants);

  app.post("/api/plants/add", authJwt.verifyToken, plantController.addPlant);

  // Delete a specific plant
  app.delete(
    "/api/plants/:id",
    authJwt.verifyToken,
    plantController.removePlant
  );
};
