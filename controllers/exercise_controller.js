const express = require("express")

const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

const db = require("./../db")

router.get("/", (req, res) => {
  const sql = "SELECT * FROM exercise;"

  db.query(sql, (err, dbRes) => {
    const workouts = dbRes.rows
    res.render("home", {
      workouts: workout,
    })
  })
})
//       |
router.get("/exercise/new", ensureLoggedIn, (req, res) => {
  res.render("new_exercise")
})
//       |
//       V
router.get("/exercise/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * from exercise where id = $1;`
  console.log(sql)

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const exercise = dbRes.rows[0]
      res.render("exercise_details", { exercise })
    }
  })
})

router.post("/exercise", ensureLoggedIn, (req, res) => {
  const sql = `
    INSERT INTO exercise (title, weight, sets, reps, rest) 
    VALUES ($1, $2, $3, $4, $5);
  `
  
  db.query(
    sql,
    [req.body.title, req.body.weight, req.body.sets, req.body.sets, req.body.reps, rep.body.rest, req.session.userId],
    (err, dbRes) => {
      res.redirect("/")
    }
  )
})

router.get("/exercise/:exercise_id/edit", (req, res) => {

  const sql = `SELECT * FROM exercise WHERE id = $1;`

  db.query(sql, [req.params.exercise_id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const workout = dbRes.rows[0]
      res.render("edit_exercise", { exercise: exercise })
    }
  })
})

router.put("/exercise/:exercise_id", (req, res) => {
  const sql = `UPDATE exercise SET title = $1, image_url = $2 WHERE id = $3;`

  db.query(
    sql,
    [req.body.title, req.body.weight, req.body.sets, req.body.sets, req.body.reps, rep.body.rest, req.params.exercise_id],
    (err, dbRes) => {
      res.redirect(`/exercise/${req.params.exercise_id}`)
    }
  )
})

router.delete("/exercise/:exercise_id", (req, res) => {
  const sql = `DELETE FROM exercise WHERE id = $1;`

  db.query(sql, [req.params.exercise_id], (err, dbRes) => {
    res.redirect("/")
  })
})

module.exports = router