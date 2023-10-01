var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json([
    {
      username: 'Nikhil',
      age: 23
    },
    {
      username: 'Mike',
      age: 22
    }
  ]);
});

module.exports = router;
