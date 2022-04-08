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

    const emp_length = req.body.emp_length;
    const annual_income = req.body.annual_income;
    const purpose = req.body.purpose;
    const home_ownership = req.body.home_ownership;
    const contact = req.body.purpose;
    const email = req.body.email;
    console.log(req.body.emp_length);
    console.log(req.body);


    connection.query(
        "UPDATE person SET emp_length = ?, annual_income = ?, purpose = ?, home_ownership = ?, contact = ? where email = ? ;",
        [emp_length, annual_income,purpose,home_ownership,contact,email],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            console.log(result);
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
                if(result[0].emp_length != null){
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