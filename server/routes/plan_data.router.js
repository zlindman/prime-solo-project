const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/plan data GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if (req.isAuthenticated()) {
    let queryText = `
    SELECT "lifts"."name" AS "lift_name", "activity_log"."sets",
      "activity_log"."reps", "activity_log"."weight"
      FROM "lifts"
      LEFT JOIN "activity_log" ON "lifts"."id" = "activity_log"."lift_id"
      JOIN "plans" ON "lifts"."plan_id" = "plans"."id"
      WHERE "plans"."user_id" = $1;
    `
    pool.query(queryText, [req.user.id]).then((result) => {
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
router.post('/', (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    console.log(req.body);
    const { liftName, weight, sets, reps } = req.body;
    const queryText = `
      INSERT INTO "activity_log" ("lift_id", "sets", "reps", "weight")
      VALUES ((SELECT "id" FROM "lifts" WHERE "name" = $1), $2, $3, $4);
    `
    pool.query(queryText, [liftName, weight, sets, reps])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error('Error adding lift data:', error);
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