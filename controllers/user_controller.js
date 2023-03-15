
   
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const db = require("./../db")

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.post("/", (req, res) => {
  const { email, password, passwordConfirmation } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, digestedPassword) => {
      const sql = `
        insert into users (email, password_digest)
        values ($1, $2) returning id;
      `

      db.query(sql, [email, digestedPassword], (err, dbRes) => {
        if (err) {
          console.err(err)
          res.render("signup")
        } else {
          req.session.userId = dbRes.rows[0].id
          res.redirect("/")
        }
      })
    })
  })
})

module.exports = router

/*
router.delete("/users/:id") // delete a user
router.put("/users/:id") // update single user
router.get("/users/new") // get new user form
router.get("/users/:id/edit") // get existing user form
router.get("/users/:id") // get single user
*/
