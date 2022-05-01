const router = require('express').Router()
const db = require('../dbConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const md5 = require("md5")

router.post("/login", async(req, res) => {
  const email = req.body.email
  const password = req.body.password

  console.log(req.body)

  try {
    if(!email || !password) return res.status(401).json({status: "Failure", message: "Please enter all the required details"})

    const checkIfUserExists = await db.query("SELECT email, username, id, hashed_password FROM users WHERE email ILIKE $1", [email])

    if(checkIfUserExists.rows[0]?.email != email) return res.status(401).json({ 
      status: "Failure", 
      message: "No such account exists with the entered email address, try creating a new account"
    })

    const doesPasswordMatch = await bcrypt.compare(password, checkIfUserExists.rows[0].hashed_password)
    
    if(!doesPasswordMatch) return res.status(401).json({message: "Email ID or password might be wrong, please make sure entered details are correct"})

    const authToken = jwt.sign({
      username: checkIfUserExists.rows[0].username,
      userID: checkIfUserExists.rows[0].id
    }, process.env.JWT_SECRET)

    res.cookie('authToken', authToken, {httpOnly: true}).json({
      status: 'Success',
      message: "Successfully logged in, redirecting.."
    })
    
  } catch(err) {
    console.log(err)
  }
})

router.post("/signup", async(req, res) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
  try{

    if(!email || !password || !username) return res.status(400).json({status: "Failure", message: "Please enter all the required details"})

    const checkIfUserExists = await db.query("SELECT email FROM users WHERE email ILIKE $1", [email])

    if(checkIfUserExists.rowCount > 0) {
      return res.status(400).json({
        status: "Failure",
        message: "Couldnt create account, since there already exists a user with that email address"
      })
    }

    const checkIfUsernameExists = await db.query("SELECT * FROM users WHERE username ILIKE $1", [username])

    if(checkIfUsernameExists.rowCount > 0) {
      return res.status(400).json({
        status: "Failure",
        message: "Couldnt create account, since there already exists a user with that username"
      })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    let gravitarURL = `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon`
    console.log(gravitarURL)

    const addNewUserQuery = await db.query("INSERT INTO users (username, hashed_password, email, url, joined_at) VALUES ($1, $2, $3, $4, $5) returning id", [username, hashedPassword, email, gravitarURL, new Date()])

    if(addNewUserQuery.rowCount > 0) {

      const authToken = jwt.sign(
        {
          username,
          userID: addNewUserQuery.rows[0].id
        }, process.env.JWT_SECRET
      )

      res.cookie('authToken', authToken, {httpOnly: true}).json({
        status: 'Success',
        message: "Created your account, enjoy!"
      })
    }
    else {
      return res.status(400).json({
        status: "Failure",
        message: "Something seems to have gone wrong in signing you up, please be patient"
      })
    }

  } catch(err) {
    console.log(err)
  } 
})

module.exports = router