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

    const getAllAnswers = await db.query(`SELECT a.id , user_id, body, a.created_at, a.updated_at,upvoted_by, downvoted_by, username, url
    FROM answers a
    JOIN users ON user_id = users.id
    WHERE a.question_id = $1
    ORDER BY cardinality(upvoted_by) - cardinality(downvoted_by) desc
    `, [questionID])

    const getAllComments = await db.query(`SELECT c.id, user_id, answer_id, question_id, body, c.created_at, c.updated_at, c.updated_at, username, url
    FROM comments c
    LEFT JOIN users ON users.id = c.user_id
    WHERE c.question_id = $1
    ORDER BY c.created_at desc`, [questionID])

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

router.post("/:aID/edit", async(req, res) => {
  const userID = req.userID
  const editedAnswer = req.body.editedBody
  const aID = req.params.aID

  try {

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to your account to be able to edit answers"})

    const editAnswerQuery = await db.query(`UPDATE answers
    SET body = $1, updated_at = $2
    WHERE id = $3 AND user_id = $4
    returning body, updated_at`, [editedAnswer, new Date(), aID, userID])

    if(editAnswerQuery.rows[0].body) {
      res.status(200).json({
        status: "Success",
        message: "Successfully edited your answer!",
        editedDetails: editAnswerQuery.rows[0]
      })
    }

  } catch(err) {

  }

})

router.get("/:aID/delete", async(req, res) => {
  const aID = req.params.aID
  const userID = req.userID
  console.log(aID, 'hello', userID)
  try{

    if(!userID) return res.status(200).json({status: "Success", message: "Please login to be able to delete answers"})

    const deleteAnswerQuery = await db.query(`DELETE FROM answers
    WHERE id = $1 AND user_id = $2
    returning id`, [aID, userID])
    res.status(200).json({
      status: "Success",
      message: "Successfully deleted the answer!",
      deletedAnswer: deleteAnswerQuery.rows[0]
    })

  } catch(err) {
    console.log(err)
  }
})

module.exports = router