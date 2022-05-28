const router = require('express').Router()
const db = require('../dbConfig')


router.get('/', async(req, res) => {
  try{
    const getUsersQuery = await db.query(`SELECT username, url, joined_at 
    FROM users
    ORDER BY joined_at DESC`)

    res.status(200).json({
      users: getUsersQuery.rows,
      status: "Success"
    })
  } catch(err) {
    console.log(err.message)
  }
})

router.get('/:username', async(req, res) => {
  const username = req.params.username
  console.log(username)
  try {
    const getUserDetailsQuery = await db.query(`SELECT username, joined_at, about, portfolio, github, location, url
    FROM users
    WHERE username = $1`, [username])
    const getRecentQuestions = await db.query(`SELECT questions.id, title, cardinality(upvoted_by) - cardinality(downvoted_by) AS vote_count, created_at
    FROM questions
    JOIN users ON users.id = questions.user_id
    WHERE username = $1
    ORDER BY created_at DESC
    LIMIT 5`, [username])
    const getRecentAnswers = await db.query(`SELECT username, answers.id, question_id, body, cardinality(upvoted_by) - cardinality(downvoted_by) AS vote_count, created_at
    FROM answers 
    JOIN users ON users.id = answers.user_id
    WHERE username = $1
    ORDER BY created_at
    LIMIT 5`, [username])

    res.status(200).json({
      userDetails: getUserDetailsQuery.rows[0],
      questions: getRecentQuestions.rows,
      answers: getRecentAnswers.rows
    })
  } catch(err) {
    console.log(err.message)
  }

})

module.exports = router
