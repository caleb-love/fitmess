const express = require("express");

const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensure_logged_in");

const db = require("./../db");

router.get("/workouts", (req, res) => {
  const sql = "SELECT * FROM workouts ORDER BY title ASC;;";

  db.query(sql, (err, dbRes) => {
    const workouts = dbRes.rows;
    res.render("workout_list", {
      workouts: workouts,
    });
  });
});
//       |
router.get("/workouts/new", ensureLoggedIn, (req, res) => {
  const sql = `select * from exercises ORDER BY title ASC;;`;
  db.query(sql, (err, dbRes) => {
    const exercises = dbRes.rows;
    res.render("workout_new", {
      exercises: exercises,
    });
  });
});
//       |
//       V
router.get("/workouts/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * from workouts where id = $1;`;
  console.log(sql);

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const workout = dbRes.rows[0];
      res.render("workout_details", { workout });
    }
  });
});

router.post("/workouts", ensureLoggedIn, (req, res) => {
  const sql = `
    INSERT INTO workouts (title, user_id) 
    VALUES ($1, $2);
  `;

  db.query(sql, [req.body.title, req.session.userId], (err, dbRes) => {
    res.redirect("/");
  });
});

router.get("/workouts/:workout_id/edit", (req, res) => {
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

router.put("/workouts/:workout_id", (req, res) => {
  const sql = `UPDATE workouts SET title = $1 WHERE id = $2;`;

  db.query(sql, [req.body.title, req.params.workout_id], (err, dbRes) => {
    res.redirect(`/workouts/${req.params.workout_id}`);
  });
});

router.delete("/workouts/:workout_id", (req, res) => {
  const sql = `DELETE FROM workouts WHERE id = $1;`;

  db.query(sql, [req.params.workout_id], (err, dbRes) => {
    res.redirect("/");
  });
});

module.exports = router;
