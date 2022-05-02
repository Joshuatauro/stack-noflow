const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

const authChecker = async(req, res, next) => {
  const authToken = req.cookies.authToken
  try{

    // if(!authToken) return next()
    const {userID, username, url} = await jwt.verify(authToken, process.env.JWT_SECRET)
    req.userID = userID //Setting a property in the req as userID
    req.username = username
    req.profile_url = url
    return next()
  } catch(err) {
    return next()
  }
}

app.use(authChecker)

app.use("/api/auth", require('./routes/users.routes'))
app.use("/api/questions", require('./routes/questions.routes'))
app.use('/api/answers', require('./routes/answers.routes'))
app.use('/api/comments', require('./routes/comments.routes'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is up and running'))
