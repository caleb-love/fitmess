CREATE DATABASE fitMess;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS logs CASCADE;
DROP TABLE IF EXISTS workouts_exercises_junction CASCADE;


-- each user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT,
    email TEXT,
    password_digest TEXT
);

-- individual exercises, can belong to different users
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    title TEXT,
    weight INTEGER,
    sets INTEGER,
    reps INTEGER,
    rest INTEGER,
    user_id INT REFERENCES users (id)
);

-- can be used by multiple users, only one user can own the workout
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    user_id INT REFERENCES users (id),
);

-- which exercises are a part of which workout
CREATE TABLE workout_exercises_join (
    id SERIAL PRIMARY KEY,
    workout_id INT REFERENCES workouts (id),
    exercise_id INT REFERENCES exercises (id)
);

-- list of past workouts from each user
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    workout_id INT REFERENCES workouts (id),
    date timestamp
);

INSERT INTO users (full_name, username, email, password_digest) VALUES ('Caleb Love', 'caleblove', 'caleblove@live.com', '$2b$10$A0S6ZTdOKnKWPZufyE7ozup7d3HJ/YJrMCBMYu9z6Vb0o4.HIGgJ6');

INSERT INTO exercises (title, weight, sets, reps, rest, user_id) VALUES ('Squat', 100, 5, 5, 45, 1);

INSERT INTO workouts (title, user_id, exercise_id) VALUES ('Leg Day', 1, 1);

SELECT title FROM exercises JOIN workouts ON exercises.id = workouts.user_id


insert into workout_exercises_junction (workout_id, exercises_id) values (1, 1);

select * from workout_exercises_junction join exercises on exercises.id = 
workout_exercises_junction.exercises_id;

select * from workout_exercises_junction join exercises on exercises.id = 
workout_exercises_junction.exercises_id where workout_exercises_junction.workout_id = 1;