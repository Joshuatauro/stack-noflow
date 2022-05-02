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
    if(addAnswerQuery.rows[0].id) {
      res.status(200).json({
        status: 200,
        message: "Answer has been successfully published!",
        answerDetails: addAnswerQuery.rows[0]
      })
    }

  } catch(err) {
    console.log(err)
  }
})

router.get("/:questionID", async(req, res) => {
  const questionID = req.params.questionID

  try {

    const getAllAnswers = await db.query(`SELECT a.id AS answer_id, user_id, body, a.created_at, a.updated_at,upvoted_by, downvoted_by, username, url
    FROM answers a
    JOIN users ON user_id = users.id
    WHERE a.question_id = $1
    ORDER BY a.created_at asc
    `, [questionID])

    const getAllComments = await db.query(`SELECT c.id, user_id, answer_id, question_id, body, c.created_at, c.updated_at, c.updated_at, username, url
    FROM comments c
    LEFT JOIN users ON users.id = c.user_id
    WHERE c.question_id = $1`, [questionID])

    console.log(getAllComments.rows)

    res.status(200).json({
      status: "Success",
      answers: getAllAnswers.rows,
      comments: getAllComments.rows
    })

  } catch(err) {
    console.log(err)
  }
})

module.exports = router