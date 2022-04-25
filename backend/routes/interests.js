var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment')


router.get("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");
    // res.send({"Response Recieved":"Yes" , "lend_amount" : lend_amount})
});


module.exports = router;
