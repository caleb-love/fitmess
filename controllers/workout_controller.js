const express = require("express")

const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

const db = require("./../db")

router.get("/", (req, res) => {
  const sql = "SELECT * FROM workouts;"

  db.query(sql, (err, dbRes) => {
    const workouts = dbRes.rows
    res.render("home", {
      workouts: workout,
    })
  })
})
//       |
router.get("/workouts/new", ensureLoggedIn, (req, res) => {
  res.render("new_workout")
})
//       |
//       V
router.get("/workouts/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * from workouts where id = $1;`
  console.log(sql)

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const workout = dbRes.rows[0]
      res.render("workout_details", { workout })
    }
  })
})

router.post("/workouts", ensureLoggedIn, (req, res) => {
  const sql = `
    INSERT INTO workouts (title, image_url, user_id) 
    VALUES ($1, $2, $3);
  `

  db.query(
    sql,
    [req.body.title, req.body.image_url, req.session.userId],
    (err, dbRes) => {
      res.redirect("/")
    }
  )
})

router.get("/workouts/:workout_id/edit", (req, res) => {

  const sql = `SELECT * FROM workouts WHERE id = $1;`

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const workout = dbRes.rows[0]
      res.render("edit_workout", { workout: workout })
    }
  })
})

router.put("/workouts/:workout_id", (req, res) => {
  const sql = `UPDATE workouts SET title = $1, image_url = $2 WHERE id = $3;`

  db.query(
    sql,
    [req.body.title, req.body.image_url, req.params.workout_id],
    (err, dbRes) => {
      res.redirect(`/workouts/${req.params.workout_id}`)
    }
  )
})

router.delete("/workouts/:workout_id", (req, res) => {
  const sql = `DELETE FROM workouts WHERE id = $1;`

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    res.redirect("/")
  })
})

module.exports = router