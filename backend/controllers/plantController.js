const { user } = require("../models");
const db = require("../models");
const Plant = db.plant;
const User = db.user;

exports.addPlant = (req, res) => {
  User.findOne({
    where: {
      username: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found. Could not add plant." });
      }

      Plant.create({
        name: req.body.plantName,
        type: req.body.plantType,
        description: req.body.plantDesc,
        water_interval: req.body.plantWaterInt,
        last_watered: req.body.plantLastWater,
        sun_interval: req.body.plantSunInt,
        last_sunlight: req.body.plantLastSun,
        fertilizer_interval: req.body.plantFertInt,
        last_fertilizer: req.body.plantLastFert,
        user_id: user.user_id,
      })
        .then((plant) => {
          res.status(200).send({
            plant_id: plant.plant_id,
            message: "Plant added successfully!",
          });
        })
        .catch((err) => {
          console.log("error in plant query.");
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      console.log("error in user query");
      return res.status(500).send({ message: err.message });
    });
};

exports.removePlant = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      username: req.userId,
    },
  })
    .then((user) => {
      Plant.destroy({
        where: {
          plant_id: id,
        },
      })
        .then((plant) => {
          return res.status(200).send({
            plant_id: plant.plant_id,
            message: "Plant deleted successfully.",
          });
        })
        .catch((err) => {
          return res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
0;
