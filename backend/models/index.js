const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.plant = require("./plantModel.js")(sequelize, Sequelize);
db.fertilizerAlert = require("./fertilizerAlertModel.js")(sequelize, Sequelize);
db.sunlightAlert = require("./sunlightAlertModal")(sequelize, Sequelize);
db.waterAlert = require("./waterAlertModel.js")(sequelize, Sequelize);
db.token = require("./tokenModel")(sequelize, Sequelize);

//db.user.hasMany(db.plant, { foreignKey: "plant_id" });
db.plant.belongsTo(db.user, { foreignKey: "user_id" });
db.fertilizerAlert.belongsTo(db.plant, {
  foreignKey: "plant_id",
  sourceKey: "fertilizer_alert_id",
});
db.sunlightAlert.belongsTo(db.plant, {
  foreignKey: "plant_id",
  sourceKey: "sunlight_alert_id",
});
db.waterAlert.belongsTo(db.plant, {
  foreignKey: "plant_id",
  sourceKey: "water_alert_id",
});

module.exports = db;
