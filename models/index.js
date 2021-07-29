const config = require("../Config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
/////////////////////////////////////////

db.messages = require("../models/messages.model.js")(sequelize, Sequelize);

db.messages.belongsToMany(db.user, {
  through: "user_messages",
  foreignKey: "messagesId",
  otherKey: "userId_send",
  otherKey: "userId_receiver"
});
db.user.belongsToMany(db.messages, {
  through: "user_messages",
  foreignKey: "userId_send",
  foreignKey: "userId_receiver",
  otherKey: "messagesId",
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
