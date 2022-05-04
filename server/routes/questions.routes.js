const router = require("express").Router()
const db = require("../dbConfig")

router.get("/", async(req, res) => {
  const page = req.query.page || 0
  const sort = req.query.sort || 'new'
  try{

    if(sort === 'top') {
      const fetchAllPostsQuery = await db.query(`SELECT q.id AS question_id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags, COUNT(answers.question_id) AS total_answers, title, q.body, views
      FROM questions q 
      JOIN users ON users.id = user_id
      LEFT JOIN answers ON answers.question_id = q.id
      GROUP BY q.id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags
      ORDER BY cardinality(q.upvoted_by) - cardinality(q.downvoted_by) desc
      OFFSET $1
      LIMIT 15`, [page*15])
  
      res.status(200).json({
        status: "Success",
        message: fetchAllPostsQuery.rowCount <= 0 ? 'No more posts to show' : '',
        questions: fetchAllPostsQuery.rows
      })
    } else if (sort === 'views') {
      const fetchAllPostsQuery = await db.query(`SELECT q.id AS question_id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags, COUNT(answers.question_id) AS total_answers, title, q.body, views
      FROM questions q 
      JOIN users ON users.id = user_id
      LEFT JOIN answers ON answers.question_id = q.id
      GROUP BY q.id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags
      ORDER BY views DESC
      OFFSET $1
      LIMIT 15`, [page*15])
  
      res.status(200).json({
        status: "Success",
        message: fetchAllPostsQuery.rowCount <= 0 ? 'No more posts to show' : '',
        questions: fetchAllPostsQuery.rows
      })
    } else {
      const fetchAllPostsQuery = await db.query(`SELECT q.id AS question_id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags, COUNT(answers.question_id) AS total_answers, title, q.body, views
      FROM questions q 
      JOIN users ON users.id = user_id
      LEFT JOIN answers ON answers.question_id = q.id
      GROUP BY q.id, users.username, url, q.downvoted_by, q.upvoted_by, q.created_at, tags
      ORDER BY q.created_at DESC
      OFFSET $1
      LIMIT 15`, [page*15])
  
      res.status(200).json({
        status: "Success",
        message: fetchAllPostsQuery.rowCount <= 0 ? 'No more posts to show' : '',
        questions: fetchAllPostsQuery.rows
      })
    }
  
  } catch(err) {
    console.log(err)
  }
})

router.get('/:id', async(req, res) => {
  const questionID = req.params.id
  try{
    
    const getQuestionDetails = await db.query(`
      SELECT q.id, title, body, q.created_at, updated_at, views, upvoted_by, downvoted_by, tags, username, user_id, url
      FROM questions q
      JOIN users ON q.user_id = users.id
      WHERE q.id = $1
    `, [questionID])
    const updateViews = await db.query("UPDATE questions SET views = views + 1 WHERE id=$1", [questionID])

    res.status(200).json({status: "Success", questionDetails: getQuestionDetails.rows[0]})

  } catch(err) {

  }
})

router.post("/publish", async(req, res) => {
  const title = req.body.title
  const body = req.body.body
  const userID = req.userID
  const tags = req.body.tags
  const createdAt = new Date()

  console.log(title)

  try{

    if(!userID) return res.status(400).json({status:"Failure", message: "Please log in first to be able to post questions"})

    if(!title || !body) return res.status(400).json({status: "Failure", message: "Please enter all fields"})

    const addPostQuery = await db.query("INSERT INTO questions(user_id, title, body, created_at, upvoted_by, tags) VALUES ($1, $2, $3, $4, $5, $6) returning id", [userID, title, body, createdAt, [userID], tags ])

    res.status(200).json({
      status: "Success",
      message: "Successfully created post, redirecting...",
      question_id: addPostQuery.rows[0].id
    })

  } catch(err) {
    res.status(400).json({
      status: "Failure",
      message: err.message
    })
  }
  
})

module.exports = router
