CREATE DATABASE fitMess;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT,
    email TEXT,
    password_digest TEXT
);

CREATE TABLE exercise (
    id SERIAL PRIMARY KEY,
    exercise_id INTEGER
    title TEXT,
    weight INTEGER,
    sets INTEGER,
    reps INTEGER,
    rest INTEGER
);

CREATE TABLE workout (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER
    workout_name TEXT,
);

CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER,
    date datetime,
);

INSERT INTO exercise (title, sets, reps, rest) VALUES ('Squat', '5', '5', '45');
