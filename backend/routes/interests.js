var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment')


router.post("/getReturns", function(req, res, next) {
    
    const email = req.body.email;

    connection.query("Select * from returns where email = ?",[email],(err,result) =>{
        if(err){console.log(err)}
        else{
            if(result.length > 0){
                // console.log(result)
                res.send(result)

            }else{
                res.send([])
            }
        }
    })
// res.send("This statement is generate by p2pLending API backend");
    // res.send({"Response Recieved":"Yes" , "lend_amount" : lend_amount})
});


module.exports = router;
