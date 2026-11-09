const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const isAuth = require("../routes/authMiddleware").isAuth;
const isAdmin = require("../routes/authMiddleware").isAdmin;

const { body, validationResult, matchedData } = require("express-validator");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/~`]).{8,}$/;

const lengthErr = "must be between 1 and 50 characters.";
const numErr = "must be a number";
const releaseErr = "must be a valid year between 1900 and 2026";
const stockErr = "must be between 1 and 150";

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Username ${lengthErr}`)
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("password")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
    ),
];

exports.addUser = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
          errors: errors.array(),
        });
      }
      const { username, password } = matchedData(req);
      // Check whether username already exists
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [req.body.username],
      );

      if (result.rows.length > 0) {
        return res.status(409).send("Username already exists");
      }

      if (req.body.confirm !== req.body.password) {
        return res.status(409).send("Passwords do no match");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [req.body.username, hashedPassword],
      );
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

exports.postsListGet = (req, res) => {
  pool
    .query("SELECT * FROM posts")
    .then((result) => {
      console.log("Hey");
      console.log(req.user);
      //console.log(result.rows);
      res.render("index", { posts: result.rows, user: req.user });
    })
    .catch((err) => console.log(err));
};
