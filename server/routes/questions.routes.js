const router = require("express").Router()
const db = require("../dbConfig")

router.get("/", async(req, res) => {
  try{

    const fetchAllPostsQuery = await db.query(`SELECT q.id AS question_id, users.username, url, array_length(q.downvoted_by,1) AS total_downvotes, array_length(q.upvoted_by,1) AS total_upvotes, q.created_at, tags, COUNT(answers.question_id) AS total_answers, title, q.body
    FROM questions q 
    JOIN users ON users.id = user_id
    LEFT JOIN answers ON answers.question_id = q.id
    GROUP BY q.id, users.username, url, array_length(q.downvoted_by,1), array_length(q.upvoted_by,1), q.created_at, tags
    `)

    res.status(200).json({
      status: "Success",
      questions: fetchAllPostsQuery.rows
    })
  
  } catch(err) {
    console.log(err)
  }
})

router.post("/publish", async(req, res) => {
  const title = req.body.title
  const body = req.body.body
  const userID = req.userID
  const createdAt = new Date()

  try{

    if(!userID) return res.status(400).json({status:"Failure", message: "Please log in first to be able to post questions"})

    if(!title || !body) return res.status(400).json({status: "Failure", message: "Please enter all fields"})

    const addPostQuery = await db.query("INSERT INTO questions(user_id, title, body, created_at, upvoted_by) VALUES ($1, $2, $3, $4, $5) returning id", [userID, title, body, createdAt, [userID] ])

    console.log(addPostQuery.rows)

    res.status(200).json({
      question_id: addPostQuery.rows[0].id
    })

  } catch(err) {
    console.log(err)
  }
  
})

module.exports = router
