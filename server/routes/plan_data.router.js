const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/plan/list', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `
   SELECT * FROM "plans";
   `;
    pool.query(queryText).then((result) => {
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
})

router.get('/lifts/:planId', (req, res) => {
  let planId = req.params.planId;
  if (req.isAuthenticated()) {
    let queryText = `
    SELECT * FROM "lifts" WHERE "plan_id" = $1;
    `;
    pool.query(queryText, [planId]).then((result) => {
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
})

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
   "activity_log"."id" as "id",
   "activity_log"."sets",
   "activity_log"."reps",
   "activity_log"."weight",
   "activity_log"."difficulty",
   "activity_log"."comments"
FROM "plans"
JOIN "lifts" ON "plans"."id" = "lifts"."plan_id"
LEFT JOIN "activity_log" ON "lifts"."id" = "activity_log"."lift_id"
WHERE "activity_log"."user_id" = $1 AND "plans"."id" = $2
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

// PUT route to update lift details
router.put('/activity/:id', (req, res) => {
  const activityId = req.params.id;
  const { difficulty, comments } = req.body;
  // Update the lift data in your database using the provided liftId, difficulty, and comments
  const updateLiftQuery = `
   UPDATE "activity_log"
   SET "difficulty" = $1, "comments" = $2
   WHERE "id" = $3;
 `;

  pool.query(updateLiftQuery, [difficulty, comments, activityId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating lift:', error);
      res.sendStatus(500);
    });
});

// POST for adding plan data
router.post('/', (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    console.log(req.body);
    const { lift_id, sets, reps, weight, difficulty, comments } = req.body;
    const queryText = `
    INSERT INTO "activity_log" ("user_id", "lift_id", "sets", "reps", "weight", "difficulty", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `
    pool.query(queryText, [req.user.id, lift_id, sets, reps, weight, difficulty, comments])
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
router.delete('/:activityId', (req, res) => {
  if (req.isAuthenticated()) {
    const activityId = req.params.activityId;
    const queryText = `
      DELETE FROM activity_log
      WHERE id = $1;
    `;
    pool.query(queryText, [activityId])
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

// TODO: Update this
// PUT route to update plan name
// router.put('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     const { id, name } = req.body;
//     const queryText = `
//       UPDATE "plans"
//       SET "name" = $1
//       WHERE "id" = $2;
//     `;
//     pool.query(queryText, [name, id])
//       .then(result => {
//         res.sendStatus(200);
//       })
//       .catch(error => {
//         console.error('Error updating plan name:', error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

/**
 * POST route template
 */

//POST for creating a new plan and assigning it an id
// router.post('/create-plan', (req, res) => {
//   if (req.isAuthenticated()) {
//     const { name } = req.body;
//     const queryText = `
//       INSERT INTO "plans" ("name", "user_id")
//       VALUES ($1, $2)
//       RETURNING "id";
//     `;
//     pool.query(queryText, [name, req.user.id])
//       .then(result => {
//         res.status(201).send({ planId: result.rows[0].id });
//       })
//       .catch(error => {
//         console.error('Error creating plan:', error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

