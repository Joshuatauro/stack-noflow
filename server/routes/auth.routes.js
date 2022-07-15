const router = require("express").Router();
const db = require("../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('reached login')

  try {
    if (!email || !password)
      return res
        .status(401)
        .json({
          status: "Failure",
          message: "Please enter all the required details",
        });

    const checkIfUserExists = await db.query(
      "SELECT email, username, id, hashed_password FROM users WHERE email ILIKE $1",
      [email]
    );

    if (checkIfUserExists.rows[0]?.email != email)
      return res.status(401).json({
        status: "Failure",
        message:
          "No such account exists with the entered email address, try creating a new account",
      });

    const doesPasswordMatch = await bcrypt.compare(
      password,
      checkIfUserExists.rows[0].hashed_password
    );

    if (!doesPasswordMatch)
      return res
        .status(401)
        .json({
          message:
            "Email ID or password might be wrong, please make sure entered details are correct",
        });

    const authToken = jwt.sign(
      {
        username: checkIfUserExists.rows[0].username,
        userID: checkIfUserExists.rows[0].id,
        url: `https://www.gravatar.com/avatar/${md5(
          email.trim().toLowerCase()
        )}?d=identicon`,
      },
      process.env.JWT_SECRET
    );

    res.cookie("authToken", authToken, { httpOnly: true, secure:true, sameSite:"none", maxAge: 2592000000}).json({
      status: "Success",
      message: "Successfully logged in, redirecting..",
      userID: checkIfUserExists.rows[0].id,
    });
  } catch (err) {
  }
});

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  try {
    if (!email || !password || !username)
      return res
        .status(400)
        .json({
          status: "Failure",
          message: "Please enter all the required details",
        });

    const checkIfUserExists = await db.query(
      "SELECT email FROM users WHERE email ILIKE $1",
      [email]
    );

    if (checkIfUserExists.rowCount > 0) {
      return res.status(400).json({
        status: "Failure",
        message:
          "Couldnt create account, since there already exists a user with that email address",
      });
    }

    const checkIfUsernameExists = await db.query(
      "SELECT * FROM users WHERE username ILIKE $1",
      [username]
    );

    if (checkIfUsernameExists.rowCount > 0) {
      return res.status(400).json({
        status: "Failure",
        message:
          "Couldnt create account, since there already exists a user with that username",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let gravitarURL = `https://www.gravatar.com/avatar/${md5(
      email.trim().toLowerCase()
    )}?d=identicon`;

    const addNewUserQuery = await db.query(
      "INSERT INTO users (username, hashed_password, email, url, joined_at) VALUES ($1, $2, $3, $4, $5) returning id",
      [username, hashedPassword, email, gravitarURL, new Date()]
    );

    if (addNewUserQuery.rowCount > 0) {
      const authToken = jwt.sign(
        {
          username,
          userID: addNewUserQuery.rows[0].id,
          email: addNewUserQuery.rows[0].email,
          url: gravitarURL,
        },
        process.env.JWT_SECRET
      );

      res.cookie("authToken", authToken, { httpOnly: true, sameSite:"lax" }).json({
        status: "Success",
        message: "Created your account, enjoy!",
        userID: addNewUserQuery.rows[0].id
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message:
          "Something seems to have gone wrong in signing you up, please be patient",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie('authToken')
    res.json({
      message: "Successfully logged out!",
      status: "Success"
    })
  } catch (err) {
    res.json({
      message: err.message,
      status: "Failure"
    })
  }
});

router.get("/status", async (req, res) => {
  const userID = req.userID;
  const username = req.username;
  const url = req.profile_url;
  res.status(200).json({
    status: "Success",
    userID,
    username,
    isLoggedIn: userID ? true : false,
    url,
  });
});

module.exports = router;
