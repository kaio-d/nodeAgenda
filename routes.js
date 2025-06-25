const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");

// Home
route.get("/", homeController.index);

// Login
route.get("/login", loginController.index);
route.get("/login/logout", loginController.logout)
route.post("/login", loginController.login);


// Register
route.get("/register", registerController.index);
route.post("/register", registerController.register);

// Logou


module.exports = route;
