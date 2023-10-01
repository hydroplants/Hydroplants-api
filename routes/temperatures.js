var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('/plant_care_data.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to the Plant Care DB.');
});

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM temperatures', [], (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.status(200).json({rows});
    });
});


module.exports = router;