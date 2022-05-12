const router = require("express").Router()
const db = require("../dbConfig")

router.post("/publish", async(req, res) => {
  const comment = req.body.commentBody
  const answerID = req.body.answerID
  const questionID = req.body.questionID

  const userID = req.userID
  const created_at = new Date()
 
  try {

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login or create an account to be able to publish comments"})

    if(!comment) return res.status(400).json({status: "Failure", message: "Please enter the required fields"})

    const publishCommentQuery = await db.query(`INSERT INTO comments (question_id, answer_id, body, created_at, user_id) VALUES ($1, $2, $3, $4, $5) returning *`, [questionID, answerID,comment, created_at, userID])

    if(publishCommentQuery.rows[0].id) {
      res.status(200).json({
        status: "Success",
        commentDetails: publishCommentQuery.rows[0]
      })
    }

  } catch(err) {
    console.log(err)
  }

})

module.exports = router