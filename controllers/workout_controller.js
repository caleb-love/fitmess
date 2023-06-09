const express = require("express");

const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensure_logged_in");

const db = require("./../db");

router.get("/workouts", ensureLoggedIn, (req, res) => {
  const sql = `
      select workouts.workout_user_id, junction_id, workouts.workout_id, workouts.workout_title, exercises.exercise_id, exercises.exercise_title, exercises.weight, exercises.sets, exercises.reps, exercises.rest 
      from workouts_exercises_junction 
      join exercises on workouts_exercises_junction.junction_exercise_id = exercises.exercise_id
      join workouts on workouts_exercises_junction.junction_workout_id = workouts.workout_id;
    `;

  db.query(sql, (err, dbRes) => {
    console.log(err);
    const workouts = dbRes.rows;
    res.render("workout_list", {
      workouts: workouts,
    });
  });
});

router.get("/workouts", ensureLoggedIn, (req, res) => {
  const sql = "SELECT workout_title, workout_id FROM workouts ORDER BY workout_title ASC;";

  db.query(sql, (err, dbRes) => {
    const workouts = dbRes.rows;
    res.render("workout_list", {
      workouts: workouts,
    });
  });
});
// //       |
router.get("/workouts/new", ensureLoggedIn, (req, res) => {
  const sql = `select exercise_title, exercise_id from exercises;`;
  db.query(sql, (err, dbRes) => {
    const exercises = dbRes.rows;
    res.render("workout_new", {
      exercises: exercises,
    });
  });
});

router.get("/workouts/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * 
  from workouts_exercises_junction 
  join exercises on workouts_exercises_junction.junction_exercise_id = exercises.exercise_id
  join workouts on workouts_exercises_junction.junction_workout_id = workouts.workout_id;`;
  console.log(sql);

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    if (err) {
      console.log('hi');
      console.log(err);
    } else {
      const workout = dbRes.rows[0];
      res.render("workout_details", { workout });
    }
  });
});

router.post("/workouts", ensureLoggedIn, (req, res) => {
  const sql = `
    INSERT INTO workouts (title, id)
    VALUES ($1, $2);
  `;

  db.query(sql, [req.body.workout_title, req.session.userId], (err, dbRes) => {
    res.redirect("/");
  });
});

router.get("/workouts/:workout_id/edit", ensureLoggedIn, (req, res) => {
  const sql = `SELECT * FROM workouts WHERE id = $1;`;

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const workout = dbRes.rows[0];
      res.render("workout_edit", { workout: workout });
    }
  });
});

router.put("/workouts/:workout_id", ensureLoggedIn, (req, res) => {
  const sql = `UPDATE workouts SET title = $1 WHERE id = $2;`;

  db.query(sql, [req.body.workout_title, req.params.workout_id], (err, dbRes) => {
    res.redirect(`/workouts/${req.params.workout_id}`);
  });
});

router.delete("/workouts/:workout_id", ensureLoggedIn, (req, res) => {
  const sql = `DELETE FROM workouts WHERE id = $1;`;

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    res.redirect("/");
  });
});

module.exports = router;
