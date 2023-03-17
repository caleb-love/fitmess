const express = require("express");

const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensure_logged_in");

const db = require("./../db");

// shows all exercises
router.get("/exercises", (req, res) => {
  const sql = "SELECT * FROM exercises ORDER BY exercise_title ASC;";

  db.query(sql, (err, dbRes) => {
    console.log(err);
    const exercises = dbRes.rows;
    res.render("exercise_list", {
      exercises: exercises,
    });
  });
});

// show new exercise page
router.get("/exercises/new", ensureLoggedIn, (req, res) => {
  res.render("exercise_new")
});

// show individual exercise
router.get("/exercises/:id", (req, res) => {
  const sql = `select * from exercises where exercise_id = $1;`;
  console.log('/exercises/:id sql', sql);

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const exercise = dbRes.rows[0];
      res.render("exercise_details", { exercise });
    }
  });
});


// add an exercise
router.post("/exercises", (req, res) => {
  const sql = `
    INSERT INTO exercises (exercise_title, weight, sets, reps, rest, exercise_user_id) VALUES ($1, $2, $3, $4, $5, $6);
  `;

  db.query(
    sql,
    [
      req.body.exercise_title,
      req.body.weight,
      req.body.sets,
      req.body.reps,
      req.body.rest,
      req.session.userId,
    ],
    (err, dbRes) => {
      res.redirect("/exercises");
    }
  );
});

router.get("/exercises/:exercise_id/edit", (req, res) => {
  const sql = `SELECT * FROM exercises WHERE exercise_id = $1;`;

  db.query(sql, [req.params.exercise_id], (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const exercise = dbRes.rows[0];
      res.render("exercise_edit", { exercise: exercise });
    }
  });
});

router.put("/exercises/:exercise_id", (req, res) => {
  const sql = `UPDATE exercises SET exercise_title = $1, weight = $2, sets = $3, reps = $4, rest = $5 WHERE exercise_id = $6;`;
// console.log(sql);
  db.query(
    sql,
    [
      req.body.exercise_title,
      req.body.weight,
      req.body.sets,
      req.body.reps,
      req.body.rest,
      req.params.exercise_id,
    ],
    (err, dbRes) => {
      console.log(dbRes);
      res.redirect(`/exercises/${req.params.exercise_id}`);
    }
  );
});

router.delete("/exercises/:exercise_id", (req, res) => {
  const sql = `DELETE FROM exercises WHERE exercise_id = $1;`;

  db.query(sql, [req.params.exercise_id], (err, dbRes) => {
    res.redirect("/exercises");
  });
});

module.exports = router;
