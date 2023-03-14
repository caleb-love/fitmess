CREATE DATABASE fitMess;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS log;
DROP TABLE IF EXISTS workout_exercises_junction;


-- each user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT,
    email TEXT,
    password_digest TEXT
);

-- individual exercises, can belong to different users
CREATE TABLE exercise (
    id SERIAL PRIMARY KEY,
    title TEXT,
    weight INTEGER,
    sets INTEGER,
    reps INTEGER,
    rest INTEGER
    user_id INT REFERENCES users (id)
);

-- can be used by multiple users, only one user can own the workout
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    user_id INT REFERENCES users (id),
    exercise_id INT REFERENCES exercise (id),
);

-- list of past workouts from each user
CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    workout_id INT REFERENCES workouts (id),
    date datetime,
);

-- which exercises are a part of which workout
CREATE TABLE workout_exercises_junction (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    workout_id INT REFERENCES workouts (id),
    exercise_id INT REFERENCES exercise (id),
);

INSERT INTO exercise (title, sets, reps, rest) VALUES ('Squat', '5', '5', '45');
