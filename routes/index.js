const router = require("express").Router();
const passport = require("passport");
//const connection = require("../config/database");
//const User = connection.models.User;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const userController = require("../controllers/userController");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const isMember = require("./authMiddleware").isMember;

/**
 * -------------- POST ROUTES ----------------
 */

router.get("/", userController.postsListGet);

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up", { success: false, fail: false, user: req.user });
});

/*
router.post("/sign-up", async (req, res, next) => {
  try {
    // Check whether username already exists
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);

    if (result.rows.length > 0) {
      return res.status(409).send("Username already exists");
    }

    if (req.body.confirm !== req.body.password) {
      return res.status(409).send("Passwords do no match");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
*/

router.post("/sign-up", userController.addUser);

router.get("/login", (req, res, next) => {
  res.render("login", { user: req.user });
});

router.get("/login-failed", (req, res, next) => {
  res.render("login-failed");
});

router.get("/member-success", isMember, async (req, res) => {
  res.render("member-success");
});

router.get("/member-fail", isAuth, async (req, res) => {
  res.render("member-fail");
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-failed",
    failureMessage: true,
  }),
);

router.post("/create", isAuth, async (req, res, next) => {
  const username = req.user.username;

  await pool
    .query(`INSERT INTO posts (username,title, post) VALUES ($1, $2, $3)`, [
      username,
      req.body.title,
      req.body.content,
    ])
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.post("/join", isAuth, async (req, res, next) => {
  const secret = req.body.secret;
  const username = req.user.username;

  if (secret === "Nangashahrukh") {
    pool
      .query(`UPDATE users SET member=TRUE WHERE username = $1;`, [username])
      .then((result) => res.redirect("/member-success"))
      .catch((err) => console.log(err));
  } else {
    //alert("Wrong password");
    res.redirect("/member-fail");
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
});

router.get("/delete/:id", isAdmin, async (req, res) => {
  pool
    .query(`DELETE FROM posts WHERE id = $1;`, [req.params.id])
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

/*

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "login-success",
  }),
);

router.post("/register", (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt,
    admin: true,
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.redirect("/login");
});


 

router.get("/", (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});


 
router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route.");
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/protected-route");
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>',
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

*/

module.exports = router;
