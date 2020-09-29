module.exports = (sequelize, Sequelize) => {
  const sunlightAlert = sequelize.define("sunlightAlert", {
    sunlight_alert_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    next_sunlight_alert: {
      type: Sequelize.DATE,
    },
  });

  return sunlightAlert;
};
