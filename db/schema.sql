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
    rest INTEGER,
    user_id INT REFERENCES users (id)
);

-- can be used by multiple users, only one user can own the workout
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    user_id INT REFERENCES users (id),
    exercise_id INT REFERENCES exercise (id)
);

-- list of past workouts from each user
CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    workout_id INT REFERENCES workouts (id),
    date timestamp
);

-- which exercises are a part of which workout
CREATE TABLE workout_exercises_junction (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    workout_id INT REFERENCES workouts (id),
    exercise_id INT REFERENCES exercise (id)
);

INSERT INTO users (full_name, username, email, password_digest) VALUES ('Caleb Love', 'caleblove', 'caleblove@live.com', '$2b$10$A0S6ZTdOKnKWPZufyE7ozup7d3HJ/YJrMCBMYu9z6Vb0o4.HIGgJ6');

INSERT INTO exercise (title, weight, sets, reps, rest, user_id) VALUES ('Squat', 100, 5, 5, 45, 1);

INSERT INTO workouts (title, user_id) VALUES ('Leg Day', 1);
