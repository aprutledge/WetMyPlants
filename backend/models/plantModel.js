module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("plant", {
    plant_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    water_interval: {
      type: Sequelize.INTEGER,
    },
    last_watered: {
      type: Sequelize.DATE,
      isDate: true,
    },
    sun_interval: {
      type: Sequelize.INTEGER,
    },
    last_sunlight: {
      type: Sequelize.DATE,
      isDate: true,
    },
    fertilizer_interval: {
      type: Sequelize.INTEGER,
    },
    last_fertilizer: {
      type: Sequelize.DATE,
      isDate: true,
    },
  });

  return Plant;
};
