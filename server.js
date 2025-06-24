require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => {
    console.log(e);
  });

const {middlewareGlobal, checkCrsfError, csrfMiddleware} = require('./src/middlewares/middleware');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const routes = require("./routes");
const path = require("path");

const sessionOptions = session({
  secret: "AXYB41MALPIW4IRFJWEFIOJNI",
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 7, 
    httpOnly: true,
  },
});

app.use(helmet()); 

app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public")));

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCrsfError);
app.use(csrfMiddleware);

app.use(routes);

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
    console.log("Servidor executando na porta: 3000");
  });
});
