const router = require('express').Router()
const db = require("../dbConfig")

router.post("/publish", async(req, res) => {
  const userID = req.userID
  const body = req.body.answer
  const qID = req.body.questionID
  const createdAt = new Date()

  try {
    if(!userID) return res.status(400).json({status: "Failure", message: "Please login to be able to post an answer"})

    if(!body || !qID ) return res.status(400).json({status: "Failure", message: "Please enter all the details to be able to make an answer"})

    const addAnswerQuery = await db.query("INSERT INTO answers (question_id, body, user_id, upvoted_by, created_at) VALUES ($1, $2, $3, $4, $5) returning *", [qID, body, userID, [userID], createdAt])

    console.log(addAnswerQuery.rows)

  } catch(err) {
    console.log(err)
  }

})

module.exports = router