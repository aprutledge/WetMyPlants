require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Token = db.token;

const Op = db.Sequelize.Op;

function createAccessToken(user) {
  return jwt.sign({ id: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

function createRefreshToken(user) {
  return jwt.sign({ id: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "24h",
  });
}

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.send({ message: "User was successfully registered." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // refreshTokens.push(refreshToken);

      const accessToken = createAccessToken(user.username);
      const refreshToken = createRefreshToken(user.username);

      Token.create({
        refresh_token: refreshToken,
      })
        .then({})
        .catch({});
      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

//TODO Verify that this does what I want it to do
exports.refresh = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === "")
    return res
      .status(200)
      .send({ message: "No refresh token.", accessToken: null });
  Token.findOne({
    where: {
      refresh_token: refreshToken,
    },
  })
    .then((token) => {
      if (token == null) {
        return res
          .status(403)
          .send({ message: "Token does not exist or has expired." });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err)
            return res
              .status(403)
              .send({ message: "Token is expired or does not exist." });
          const accessToken = createAccessToken(decoded.id);
          return res.status(200).send({
            message: "Refresh token accepted",
            accessToken: accessToken,
          });
        }
      );
    })
    .catch((err) => {
      console.log("it broke?");
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  if (req.body.refreshToken === null) return res.sendStatus(401);

  Token.destroy({
    where: {
      refresh_token: req.body.refreshToken,
    },
  })
    .then((token) => {
      if (token == null)
        return res.status(404).send({ message: "Token not found." });

      return res.status(200).send({ message: "Token deleted." });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
