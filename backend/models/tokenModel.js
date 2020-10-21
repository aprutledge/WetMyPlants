module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    refresh_token: {
      type: Sequelize.STRING,
    },
  });
  return Token;
};
