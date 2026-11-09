/////// app.js

const path = require("node:path");
//const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = require("./routes/index");
const pool = require("./db/pool");

const pgSession = require("connect-pg-simple")(session);

require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new pgSession({
  pool: pool,
  tableName: "sessions",
  createTableIfMissing: true,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});

//app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
//app.use(passport.session());

//app.get("/", (req, res) => res.render("index"));

/**
 * -------------- SESSION SETUP ----------------
 */
