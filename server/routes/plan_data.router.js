const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// set another get route passing in an id  (similar to movie sagas) to get details
router.get('/:planId', (req, res) => {
  const planId = req.params.planId;
 // GET route code here
 console.log('/plan data GET route');
 console.log('is authenticated?', req.isAuthenticated());
 console.log('user', req.user);
 if (req.isAuthenticated()) {
   let queryText = `
   SELECT
   "plans"."id" AS "plan_id",
   "plans"."name" AS "plan_name",
   "lifts"."name" AS "lift_name",
   "lifts"."id" AS "lift_id",
   "activity_log"."sets",
   "activity_log"."reps",
   "activity_log"."weight"
FROM "plans"
JOIN "lifts" ON "plans"."id" = "lifts"."plan_id"
LEFT JOIN "activity_log" ON "lifts"."id" = "activity_log"."lift_id"
WHERE "plans"."user_id" = $1 AND "plans"."id" = $2
   `;
   pool.query(queryText, [req.user.id, planId]).then((result) => {
     console.log('result', result.rows);
     res.send(result.rows);
   }).catch((error) => {
     console.log('Database query error:', error.message);
     console.log('Query was:', queryText);
     res.sendStatus(500);
   });
 } else {
   res.sendStatus(403);
 }
});


/**
//  * GET route template
//  */
// router.get('/', (req, res) => {
//   // GET route code here
//   console.log('/plan data GET route');
//   console.log('is authenticated?', req.isAuthenticated());
//   console.log('user', req.user);
//   if (req.isAuthenticated()) {
//     let queryText = `
//     SELECT
//     "plans"."id" AS "plan_id",
//     "plans"."name" AS "plan_name",
//     "lifts"."name" AS "lift_name",
//     "lifts"."id" AS "lift_id",
//     "activity_log"."sets",
//     "activity_log"."reps",
//     "activity_log"."weight"
// FROM "plans"
// JOIN "lifts" ON "plans"."id" = "lifts"."plan_id"
// LEFT JOIN "activity_log" ON "lifts"."id" = "activity_log"."lift_id"
// WHERE "plans"."user_id" = $1
//     `;
//     pool.query(queryText, [req.user.id]).then((result) => {
//       console.log('result', result.rows);
//       res.send(result.rows);
//     }).catch((error) => {
//       console.log('Database query error:', error.message);
//       console.log('Query was:', queryText);
//       res.sendStatus(500);
//     });
//   } else {
//     res.sendStatus(403);
//   }
// });


// PUT route to update plan name
router.put('/', (req, res) => {
  if (req.isAuthenticated()) {
    const { id, name } = req.body;
    const queryText = `
      UPDATE "plans"
      SET "name" = $1
      WHERE "id" = $2;
    `;
    pool.query(queryText, [name, id])
      .then(result => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.error('Error updating plan name:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route template
 */

//POST for creating a new plan and assigning it an id
router.post('/create-plan', (req, res) => {
  if (req.isAuthenticated()) {
    const { name } = req.body;
    const queryText = `
      INSERT INTO "plans" ("name", "user_id")
      VALUES ($1, $2)
      RETURNING "id";
    `;
    pool.query(queryText, [name, req.user.id])
      .then(result => {
        res.status(201).send({ planId: result.rows[0].id });
      })
      .catch(error => {
        console.error('Error creating plan:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// POST for adding plan data
router.post('/add-lift', (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    console.log(req.body);
    const { name, sets, reps, weight, planId } = req.body;
    const queryText = `
    WITH "inserted_lift" AS (
      INSERT INTO "lifts" ("name", "plan_id")
      VALUES ($1, $2)
      RETURNING "id"
  )
  INSERT INTO "activity_log" ("lift_id", "sets", "reps", "weight")
  SELECT "inserted_lift"."id", $3, $4, $5
  FROM "inserted_lift"
    `
    pool.query(queryText, [name, planId, sets, reps, weight])
      .then(result => {
        console.log('req.body', req.body);
        res.sendStatus(201);
      })
      .catch(error => {
        console.error('Error adding lift data:', error);
        console.log('error adding', req.body);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// DELETE route to remove a lift from the plan
router.delete('/:liftId', (req, res) => {
  if (req.isAuthenticated()) {
    const liftId = req.params.liftId;
    const queryText = `
      DELETE FROM activity_log
      WHERE id = $1;
    `;
    pool.query(queryText, [liftId])
      .then(result => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.error('Error deleting lift:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;