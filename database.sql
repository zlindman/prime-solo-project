-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "plans" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "lifts" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"plan_id" INT REFERENCES "plans"
);

CREATE TABLE "recent_activity" (
	"id" SERIAL PRIMARY KEY,
	"plan_id" INT REFERENCES "plans",
	"activity_timestamp" TIMESTAMP
);

CREATE TABLE "activity_log" (
	"id" SERIAL PRIMARY KEY,
	"recent_activity_id" INT REFERENCES "recent_activity",
	"lift_id" INT REFERENCES "lifts",
	"sets" INT,
	"reps" INT,
	"weight" DECIMAL,
	"difficulty" INT,
	"comments" INT
);

