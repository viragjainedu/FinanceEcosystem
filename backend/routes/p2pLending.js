var express = require("express");
var router = express.Router();
var connection = require('../connection');


router.post("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const request_submitted = req.body.request_submitted;
    const lend_amount = req.body.lend_amount;
    console.log(request_submitted,lend_amount);
    res.send({"Response Recieved":"Yes" , "lend_amount" : lend_amount})
});

router.post("/CompleteProfile", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const email = req.body.email;



    connection.query(
        "UPDATE person SET first_name = ?, last_name = ?, gender = ?, DOB = ?, city = ?, state = ?, pincode = ?, address1 = ?, address2 = ? where email = ? ;",
        [first_name, last_name,gender,DOB,city,state,pincode,address1,address2,email],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            // console.log(result);
            res.send({"success":"Updated Succesfully"})
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/isProfileComplete", function(req, res, next) {
    
    // console.log("Hii");

    const email = req.body.email;
    // res.send({WrongMessage:"Wrong email bro"})   

    connection.query(
        "SELECT * FROM person WHERE email = ?",
        [email],
        (err, result)=> {
            // console.log(result)
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                // console.log(result[0]);
                if(result[0].first_name != null){
                    res.send({result:true});
                }else{
                    res.send({result:false});
                }
                
            }
            else{
                res.send({WrongMessage:"Wrong email bro"})   
            }
        }
    )
});

module.exports = router;