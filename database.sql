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

INSERT INTO "plans"("id","name")
VALUES
(2263,'Chest'),
(2264,'Back'),
(2265,'Shoulders'),
(2266,'Biceps'),
(2267,'Triceps'),
(2268,'Legs'),
(2269,'Glutes'),
(2270,'Abs/Core');

INSERT INTO "lifts"("id","name","plan_id")
VALUES
(48,'Dumbbell Bench Press',2263),
(49,'Dumbbell Flyes',2263),
(50,'Dumbbell Pullover',2263),
(51,'Incline Dumbbell Bench Press',2263),
(52,'Decline Dumbbell Bench Press',2263),
(53,'Dumbbell Floor Press',2263),
(54,'Dumbbell Squeeze Press',2263),
(56,'Dumbbell Row',2264),
(57,'Single-Arm Dumbbell Row',2264),
(58,'Dumbbell Deadlift',2264),
(59,'Dumbbell Reverse Fly',2264),
(60,'Dumbbell Shrug',2264),
(61,'Dumbbell Renegade Row',2264),
(62,'Bent-Over Dumbbell Row',2264),
(63,'Dumbbell Shoulder Press',2265),
(64,'Dumbbell Lateral Raise',2265),
(65,'Dumbbell Front Raise',2265),
(66,'Dumbbell Arnold Press',2265),
(67,'Dumbbell Rear Delt Fly',2265),
(68,'Dumbbell Upright Row',2265),
(69,'Dumbbell Y Raise',2265),
(70,'Dumbbell Bicep Curl',2266),
(71,'Hammer Curl',2266),
(72,'Concentration Curl',2266),
(73,'Incline Dumbbell Curl',2266),
(74,'Zottman Curl',2266),
(75,'Dumbbell Spider Curl',2266),
(76,'Cross-Body Hammer Curl',2266),
(77,'Dumbbell Tricep Extension',2267),
(78,'Dumbbell Kickback',2267),
(79,'Skull Crushers',2267),
(80,'Close-Grip Dumbbell Press',2267),
(81,'Dumbbell Tate Press',2267),
(82,'Overhead Dumbbell Tricep Extension (Single Arm)',2267),
(83,'Dumbbell Tricep Kickback (Single Arm)',2267),
(84,'Dumbbell Squat',2268),
(85,'Dumbbell Lunges',2268),
(86,'Dumbbell Step-Up',2268),
(87,'Dumbbell Deadlift',2268),
(88,'Dumbbell Bulgarian Split Squat',2268),
(89,'Dumbbell Goblet Squat',2268),
(90,'Dumbbell Calf Raise',2268),
(91,'Dumbbell Hip Thrust',2269),
(92,'Dumbbell Glute Bridge',2269),
(93,'Dumbbell Romanian Deadlift',2269),
(94,'Dumbbell Sumo Squat',2269),
(95,'Dumbbell Single-Leg Deadlift',2269),
(96,'Dumbbell Lateral Step-Up',2269),
(97,'Dumbbell Curtsy Lunge',2269),
(98,'Dumbbell Russian Twist',2270),
(99,'Dumbbell Side Bend',2270),
(100,'Dumbbell Sit-Up',2270),
(101,'Dumbbell Leg Raise',2270),
(102,'Dumbbell Woodchopper',2270),
(103,'Dumbbell Toe Touch',2270),
(104,'Dumbbell Plank Row',2270),
(105,'Dumbbell Windmill',2270);

-- 



