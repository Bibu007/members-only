const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
//const connection = require('./database');
//const User = connection.models.User;
//const validPassword = require("../lib/passwordUtils").validPassword;
const bcrypt = require("bcryptjs");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" });
    }
    // Authentication successful
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
