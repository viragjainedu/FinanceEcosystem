var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',function(req,res){
  // console.log(__dirname)
  res.sendFile(path.join(__dirname+'../../index.html'));
  //__dirname : It will resolve to your project folder.
});

module.exports = router;
