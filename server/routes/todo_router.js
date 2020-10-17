const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GET route, will grab all rows in a data base and arrange them by their ID
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then((result) => {
        res.send( result.rows );
    }).catch((error)=>{
        console.log("error with get request",error);
        res.sendStatus(500);
    });
});

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
});


module.exports = router;