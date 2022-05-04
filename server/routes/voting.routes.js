const router = require("express").Router()
const db = require("../dbConfig")

router.get('/questions/:qID/remove-upvote', async(req, res) => {
  const userID = req.userID
  console.log('the user id is ', userID)
  const qID = req.params.qID

  try{

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const removeUpvoteQuery = await db.query(`UPDATE questions SET upvoted_by = array_remove(upvoted_by,$1) WHERE id = $2 returning upvoted_by, downvoted_by`, [userID, qID])
    
    res.status(200).json({
      status: "Success",
      upvoted_by: removeUpvoteQuery.rows[0].upvoted_by ? removeUpvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: removeUpvoteQuery.rows[0].downvoted_by ? removeUpvoteQuery.rows[0].downvoted_by : []
    })

  } catch(err) {
    console.log(err)
  }
})

router.get('/questions/:qID/add-upvote', async(req, res) => {
  const userID = req.userID
  const qID = req.params.qID

  try{
    
    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const addUpvoteQuery = await db.query(`UPDATE questions SET
    downvoted_by = array_remove(downvoted_by, $1), upvoted_by = array_append(upvoted_by, $1)
    WHERE id = $2 
    RETURNING upvoted_by, downvoted_by`, [userID, qID])

    res.status(200).json({
      status: "Success",
      upvoted_by: addUpvoteQuery.rows[0].upvoted_by ? addUpvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: addUpvoteQuery.rows[0].downvoted_by ? addUpvoteQuery.rows[0].downvoted_by : []
    })


  } catch(err) {
    console.log(err)
  }
})

router.get('/questions/:qID/remove-downvote', async(req, res) => {
  const userID = req.userID
  const qID = req.params.qID

  try{

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const removeDownvoteQuery = await db.query(`UPDATE questions SET downvoted_by = array_remove(downvoted_by,$1) WHERE id = $2 returning upvoted_by, downvoted_by`, [userID, qID])
    
    res.status(200).json({
      status: "Success",
      upvoted_by: removeDownvoteQuery.rows[0].upvoted_by ? removeDownvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: removeDownvoteQuery.rows[0].downvoted_by ? removeDownvoteQuery.rows[0].downvoted_by : []
    })

  } catch(err) {
    console.log(err)
  }
})

router.get('/questions/:qID/add-downvote', async(req, res) => {
  const userID = req.userID
  const qID = req.params.qID

  try{
    
    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const addDownvoteQuery = await db.query(`UPDATE questions SET
    downvoted_by = array_append(downvoted_by, $1), upvoted_by = array_remove(upvoted_by, $1)
    WHERE id = $2 
    RETURNING upvoted_by, downvoted_by`, [userID, qID])

    res.status(200).json({
      status: "Success",
      upvoted_by: addDownvoteQuery.rows[0].upvoted_by ? addDownvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: addDownvoteQuery.rows[0].downvoted_by ? addDownvoteQuery.rows[0].downvoted_by : []
    })


  } catch(err) {
    console.log(err)
  }
})



router.get('/answers/:aID/remove-upvote', async(req, res) => {
  const userID = req.userID
  const aID = req.params.aID

  try{

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const removeUpvoteQuery = await db.query(`UPDATE answers SET upvoted_by = array_remove(upvoted_by,$1) WHERE id = $2 returning upvoted_by, downvoted_by`, [userID, aID])
    
    res.status(200).json({
      status: "Success",
      upvoted_by: removeUpvoteQuery.rows[0].upvoted_by ? removeUpvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: removeUpvoteQuery.rows[0].downvoted_by ? removeUpvoteQuery.rows[0].downvoted_by : []
    })

  } catch(err) {
    console.log(err)
  }
})

router.get('/answers/:aID/add-upvote', async(req, res) => {
  const userID = req.userID
  const aID = req.params.aID

  try{
    
    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const addUpvoteQuery = await db.query(`UPDATE answers SET
    downvoted_by = array_remove(downvoted_by, $1), upvoted_by = array_append(upvoted_by, $1)
    WHERE id = $2 
    RETURNING upvoted_by, downvoted_by`, [userID, aID])

    res.status(200).json({
      status: "Success",
      upvoted_by: addUpvoteQuery.rows[0].upvoted_by ? addUpvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: addUpvoteQuery.rows[0].downvoted_by ? addUpvoteQuery.rows[0].downvoted_by : []
    })


  } catch(err) {
    console.log(err)
  }
})

router.get('/answers/:aID/remove-downvote', async(req, res) => {
  const userID = req.userID
  const aID = req.params.aID

  try{

    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const removeDownvoteQuery = await db.query(`UPDATE answers SET downvoted_by = array_remove(downvoted_by,$1) WHERE id = $2 returning upvoted_by, downvoted_by`, [userID, aID])
    
    res.status(200).json({
      status: "Success",
      upvoted_by: removeDownvoteQuery.rows[0].upvoted_by ? removeDownvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: removeDownvoteQuery.rows[0].downvoted_by ? removeDownvoteQuery.rows[0].downvoted_by : []
    })

  } catch(err) {
    console.log(err)
  }
})

router.get('/answers/:aID/add-downvote', async(req, res) => {
  const userID = req.userID
  const aID = req.params.aID

  try{
    
    if(!userID) return res.status(401).json({status: "Failure", message: "Please login to be able to cast votes"})

    const addDownvoteQuery = await db.query(`UPDATE answers SET
    downvoted_by = array_append(downvoted_by, $1), upvoted_by = array_remove(upvoted_by, $1)
    WHERE id = $2 
    RETURNING upvoted_by, downvoted_by`, [userID, aID])

    res.status(200).json({
      status: "Success",
      upvoted_by: addDownvoteQuery.rows[0].upvoted_by ? addDownvoteQuery.rows[0].upvoted_by : [],
      downvoted_by: addDownvoteQuery.rows[0].downvoted_by ? addDownvoteQuery.rows[0].downvoted_by : []
    })


  } catch(err) {
    console.log(err)
  }
})




module.exports = router