const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require("./../db")

router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/sessions", (req, res) => {
  const { email, password } = req.body

  // do you even existing the users table
  const sql = `SELECT * FROM users WHERE email = $1;`

  db.query(sql, [email], (err, dbRes) => {
    // did we get a record back?
    if (dbRes.rows.length === 0) {
      // no good, user doesn't exist in the users table, stay at the login page
      res.render("login")
      return
    }

    const user = dbRes.rows[0]

    bcrypt.compare(password, user.password_digest, (err, result) => {
      if (result) {
        req.session.userId = user.id

        res.redirect("/")
      } else {
        res.render("login")
      }
    })
  })
})

router.delete("/sessions", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login")
  })
})

module.exports = router