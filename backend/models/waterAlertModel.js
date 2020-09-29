module.exports = (sequelize, Sequelize) => {
  const waterAlert = sequelize.define("waterAlert", {
    water_alert_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    next_water_alert: {
      type: Sequelize.DATE,
    },
  });

  return waterAlert;
};
