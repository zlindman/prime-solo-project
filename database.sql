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
);

CREATE TABLE "lifts" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"plan_id" INT REFERENCES "plans"
);


CREATE TABLE "activity_log" (
	"id" SERIAL PRIMARY KEY,
	"plan_id" INT REFERENCES "plans",
	"lift_id" INT REFERENCES "lifts",
	"sets" INT,
	"reps" INT,
	"weight" DECIMAL,
	"difficulty" VARCHAR(20),
	"comments" VARCHAR(50)
);



