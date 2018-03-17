var express = require('express');
var router = express.Router();


/* GET Homepage */
router.get('/', function(req, res, next) {
  res.render('index',{ title: "Course Plan"})
});

module.exports = router;
