module.exports = (sequelize, Sequelize) => {
  const fertilizerAlert = sequelize.define("fertilizerAlert", {
    fertilizer_alert_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    next_fertilizer_alert: {
      type: Sequelize.DATE,
    },
  });

  return fertilizerAlert;
};
