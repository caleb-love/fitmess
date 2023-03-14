const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const expressLayouts = require("express-ejs-layouts");

const setCurrentUser = require("./middlewares/set_current_User");
const viewHelpers = require("./middlewares/view_helpers");
const logger = require("./middlewares/logger");
const methodOverride = require("./middlewares/method_override");

const exerciseController = require("./controllers/dish_controller");
const workoutController = require("./controllers/workout_controller");
const sessionController = require("./controllers/session_controller");
const userController = require("./controllers/user_controller");

app.set("view engine", "ejs");

app.use(logger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride);
app.use(expressLayouts);
app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "whitesmoke",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(setCurrentUser);
app.use(viewHelpers);

app.use(exerciseController);
app.use(workoutController);
app.use(sessionController);
app.use('/users', userController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
