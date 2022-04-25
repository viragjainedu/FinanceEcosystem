var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment')


router.post("/getInstallments", function(req, res) {

    const email = req.body.email;

    connection.query("Select * from installments where email = ?",[email],(err,result) =>{
        if(err){console.log(err)}
        else{
            if(result.length > 0){
                res.send(result)
            }else{
                res.send([])
            }
        }
    })

});

module.exports = router;