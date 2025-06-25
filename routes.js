const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const contatoController = require("./src/controllers/contatoController");
const { loguinRequired } = require("./src/middlewares/middleware");

// Home
route.get("/", homeController.index);

// Login
route.get("/login", loginController.index);
route.get("/login/logout", loginController.logout);
route.post("/login", loginController.login);

// Register
route.get("/register", registerController.index);
route.post("/register", registerController.register);

// Contato
route.get("/contato", loguinRequired, contatoController.index);
route.get("/contato/:id", loguinRequired, contatoController.editIndex);
route.post("/contato/register", loguinRequired, contatoController.register);

module.exports = route;
