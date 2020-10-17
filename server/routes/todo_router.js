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


module.exports = router;