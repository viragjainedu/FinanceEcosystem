var express = require("express");
const connection = require("../connection");
var router = express.Router();

router.get("/", function(req, res, next) {
    // res.send("This statement is generate by news API backend");
    connection.query(
        "Select * from news;",
        [],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            // console.log(result);
            res.send(result)
        }
      ); 
});

module.exports = router;