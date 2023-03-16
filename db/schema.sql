CREATE DATABASE fitmess;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS logs CASCADE;
DROP TABLE IF EXISTS workouts_exercises_junction CASCADE;


-- each user information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT,
    email TEXT,
    password_digest TEXT
);

-- individual exercises, can belong to different users
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_title TEXT,
    weight INTEGER,
    sets INTEGER,
    reps INTEGER,
    rest INTEGER,
    exercise_user_id INT REFERENCES users (user_id)
);

-- can be used by multiple users, only one user can own the workout
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    workout_title TEXT,
    workout_user_id INT REFERENCES users (user_id)
);

-- which exercises are a part of which workout
CREATE TABLE workouts_exercises_junction (
    junction_id SERIAL PRIMARY KEY,
    junction_workout_id INT REFERENCES workouts (workout_id),
    junction_exercise_id INT REFERENCES exercises (exercise_id),
);

-- list of past workouts from each user
-- CREATE TABLE logs (
--     log_id SERIAL PRIMARY KEY,
--     log_user_id INT REFERENCES users (user_id),
--     log_workout_id INT REFERENCES workouts (workout_id),
--     date timestamp
-- );

INSERT INTO users (full_name, username, email, password_digest) VALUES ('Caleb Love', 'caleblove', 'caleblove@live.com', '$2b$10$A0S6ZTdOKnKWPZufyE7ozup7d3HJ/YJrMCBMYu9z6Vb0o4.HIGgJ6'); -- password = 123456
INSERT INTO users (full_name, username, email, password_digest) VALUES ('John Cena', 'johncena', 'johncena@live.com', '$2b$10$A0S6ZTdOKnKWPZufyE7ozup7d3HJ/YJrMCBMYu9z6Vb0o4.HIGgJ6');

INSERT INTO exercises (exercise_title, weight, sets, reps, rest, exercise_user_id) VALUES ('Squat', 120, 5, 5, 45, 1);
INSERT INTO exercises (exercise_title, weight, sets, reps, rest, exercise_user_id) VALUES ('Bench Press', 100, 5, 10, 60, 1);
INSERT INTO exercises (exercise_title, weight, sets, reps, rest, exercise_user_id) VALUES ('Lat Pulldown', 80, 5, 15, 45, 1);
INSERT INTO exercises (exercise_title, weight, sets, reps, rest, exercise_user_id) VALUES ('Bicep Curls', 40, 5, 15, 60, 1);

INSERT INTO workouts (workout_title, workout_user_id) VALUES ('Leg Day', 1,);
INSERT INTO workouts (workout_title, workout_user_id) VALUES ('Back Day', 1);
INSERT INTO workouts (workout_title, workout_user_id) VALUES ('Chest Day', 1);
INSERT INTO workouts (workout_title, workout_user_id) VALUES ('Bicept Day', 1);

INSERT INTO workouts_exercises_junction (junction_workout_id, junction_exercise_id) VALUES (4, 6);
INSERT INTO workouts_exercises_junction (junction_workout_id, junction_exercise_id) VALUES (4, 8);
INSERT INTO workouts_exercises_junction (junction_workout_id, junction_exercise_id) VALUES (4, 9);

SELECT exercises.exercise_title FROM exercises JOIN workouts ON exercises.exercise_id = workouts.workout_user_id;

-- inserting into workout 1, the first exercise assigned to the user 1
insert into workouts_exercises_junction (junction_workout_id, junction_exercise_id, junction_user_id) values (1, 6, 1);

select workouts.workout_user_id, junction_id, workouts.workout_id, workouts.workout_title as wtitle, exercises.exercise_id, exercises.exercise_title as etitle, exercises.weight, exercises.sets, exercises.reps, exercises.rest 
from workouts_exercises_junction 
join exercises on workouts_exercises_junction.junction_exercise_id = exercises.exercise_id
join workouts on workouts_exercises_junction.junction_workout_id = workouts.workout_id;


select * from workouts_exercises_junction join exercises on exercises.exercise_id = workouts_exercises_junction.exercise_id where workouts_exercises_junction.workout_id = 1;