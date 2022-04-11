var express = require("express");
const connection = require("../connection");
var router = express.Router();

router.get("/", function(req, res, next) {

    connection.query(
        "Select * from blogs;",
        [],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            // console.log(result);
            res.send({"result":result})
        }
      );    

});

module.exports = router;