const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GET route, will grab all rows in a data base and arrange them by their ID
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "status" = false;';
    pool.query(queryText).then((result) => {
        res.send( result.rows );
    }).catch((error)=>{
        console.log("error with get request",error);
        res.sendStatus(500);
    });
}); // End of GET ROUTE

// POST ROUTE, Called in Client, uses input task field form DOM, creates new row in table,
// Sanitized
router.post('/', (req, res) => {
    console.log(req.body);
    let task = req.body.task;
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [task]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
}); // End of POST ROUTE

// DELETE ROUTE, Called in client from button press, will remove a row in table based on rows id called.
// Sanitized
router.delete('/:id', (req,res) => {
    let taskID = req.params.id;
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [taskID]).then((result) => {
        console.log('Result in DELETE',result);
        res.sendStatus(200);
    }).catch((result) => {
        console.log('error in DELETE', error);
        res.sendStatus(500);
    });
}); // End of DELETE ROUTE

// PUT ROUTE, Called in client, which will update a status of false to a value of true in the database
//Sanitized 
router.put('/status/:id', (req,res) => {
    let taskID = req.params.id;
    let status = req.body.status
    let queryText = `UPDATE "tasks" SET "status" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [status, taskID]).then((result) => {
        console.log('PUT RESULT', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT', error);
        res.sendStatus(500);
    });
}); // End of PUT ROUTE

module.exports = router;