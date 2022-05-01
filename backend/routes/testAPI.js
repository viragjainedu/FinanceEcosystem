var express = require("express");
var router = express.Router();
var async = require('async');
var connection = require('../connection');

router.get("/", function(req, res, next) {

    console.log("Hii")
    var output = [];
    connection.query('SELECT * FROM person',(error,results) => {
        if(error) throw err;
    
        async.eachSeries(results,function(data,callback){ // It will be executed one by one
                //Here it will be wait query execute. It will work like synchronous
                connection.query('SELECT * FROM account_stats  where email = ?',[data.email],(error,results1) => {
                    if(error) throw err;
    
                    output.push(results1[0])
                    callback();
                });
    
        }, function(err, results) {
            if(err){console.log(err)}
            console.log(output); // Output will the value that you have inserted in array, once for loop completed ex . 1,2,3,4,5,6,7,8,9
        });
    
    })

    res.send("Hiii")
    // var now = new Date();
    // res.send(now.toISOString().slice(0, 19).replace('T', ' '));
});

module.exports = router;