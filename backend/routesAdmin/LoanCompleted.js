var express = require("express");
var router = express.Router();
var connection = require('../connection');
// var moment = require('moment')
// var nodemailer = require('nodemailer');
// const  multer = require("multer");
// const path = require('path');


router.get("/CompletedLoans", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    connection.query("Select * from completedloans group by email;",(err,result)=>{
        if(err){console.log(err)}else{
            res.send(result)
        }
    })
});



module.exports = router;