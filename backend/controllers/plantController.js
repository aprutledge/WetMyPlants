const { user, sequelize, Sequelize } = require("../models");
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
      Plant.findOne({
        where: {
          plant_id: id,
        },
      })
        .then((plant) => {
          if (plant.user_id !== user.user_id) {
            return res
              .status(500)
              .send({ message: "You aren't the owner of this plant!" });
          }

          Plant.destroy({
            where: {
              plant_id: id,
            },
          })
            .then((removedPlant) => {
              return res.status(200).send({
                plant_id: plant.plant_id,
                message: "Plant deleted successfully.",
              });
            })
            .catch((err) => {
              return res.status(403).send({ message: err.message });
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

exports.removeAllPlants = (req, res) => {
  User.findOne({
    where: {
      username: req.userId,
    },
  })
    .then((user) => {
      Plant.destroy({
        where: {
          user_id: user.user_id,
        },
      })
        .then((plant) => {
          console.log(plant);
          return res.status(200).send({
            plant_id: plant.plant_id,
            message: "Plants deleted successfully.",
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

exports.updatePlant = (req, res) => {
  // Todo
};

exports.getPlants = (req, res) => {
  sequelize
    .query(
      "SELECT * FROM plants WHERE user_id = (SELECT user_id FROM users WHERE username = :user)",
      { replacements: { user: req.userId }, type: sequelize.QueryTypes.SELECT }
    )
    .then((plants) => {
      return res.status(200).send({ plants });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
