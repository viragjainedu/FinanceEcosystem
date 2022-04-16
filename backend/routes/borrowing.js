var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment')


router.post("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const request_submitted = req.body.request_submitted;
    const lend_amount = req.body.lend_amount;
    console.log(request_submitted,lend_amount);
    res.send({"Response Recieved":"Yes" , "lend_amount" : lend_amount})
});


router.post("/verify", function(req, res, next) {

    const email = req.body.email;
    
    connection.query("UPDATE borrowing_requests set isAprroved = 1 , status = 2 where email = ?",[email],(err,output) => {
        if(err){
            console.log(err)
        }
        
        connection.query("INSERT INTO ProposedLoans (email,amount1,interest1,amount2,interest2,amount3,interest3,amount4,interest4,selected,MailSent,Time) values(?,?,?,?,?,?,?,?,?,?,?,?)",
            [email,0,0,0,0,0,0,0,0,0,0,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
            (err,output) => {
                if(err){
                    res.send(err)
                }
                res.send({"success": "ok"});
            }
        )
        
    });

});

router.post("/reject", function(req, res, next) {

    const email = req.body.email;

    connection.query("UPDATE borrowing_requests set isAprroved = 0 , status = 1 where email = ?",[email],(err,output) => {
        if(err){
            console.log(err)
        }
        connection.query("Delete from ProposedLoans where email = ?",[email],(err,result) => {
            if(err){
                res.send({err:err})
            }
            res.send({"success": "ok"});
        });
    });

});

router.post("/details", function(req, res, next) {

    const email = req.body.email;

    connection.query("Select * from person where email = ?",[email],(err,output) => {
        if(err){
            console.log(err)
        }
        res.send(output[0]);
    });

});

router.post("/CompleteProfile", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const emp_length = req.body.emp_length;
    const annual_income = req.body.annual_income;
    const purpose = req.body.purpose;
    const collateral = req.body.collateral;
    const contact = req.body.contact;
    const email = req.body.email;
    console.log(req.body.emp_length);
    console.log(req.body);


    connection.query(
        "UPDATE person SET emp_length = ?, annual_income = ?, purpose = ?,collateral = ?,  contact = ? where email = ? ;",
        [emp_length, annual_income,purpose,collateral,contact,email],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            console.log(result);


            //INSERTING IN BORROWING REQUESTS ENDS            
            connection.query("INSERT INTO borrowing_requests (email,isAprroved,status) values (?,0,1)",
            [email],
            (err, result)=> {
                if(err){
                    console.log(err)
                }    
                res.send({"success":"Updated Succesfully"})
            }
            );
            //INSERTING IN BORROWING REQUESTS ENDS
           
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/profile_info", function(req, res, next) {
    
    const email = req.body.email;

    connection.query(
        "SELECT * FROM person WHERE email = ?",
        [email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            else if (result.length > 0) {
                res.send(result[0]);
            }
            else{
                res.send({WrongMessage:"Wrong email bro"})   
            }
        }
    )
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

var obj = [];
router.get("/requests", function(req, res, next) {
    
    
    connection.query(
        "SELECT * FROM borrowing_requests;",
        [],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            res.send(result)
        }
    )
});

router.post("/getStatus", function(req, res, next) {
    
    const email = req.body.email
    connection.query(
        "SELECT status FROM borrowing_requests where email = ?;",
        [email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            res.send(result[0])
        }
    )
});

router.get("/ProposedLoansForVerified", function(req, res, next) {
    
    connection.query(
        "SELECT * FROM ProposedLoans",[],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            res.send(result)
        }
    )
});

router.post("/isLoanCalculatedForThisEmail", function(req, res, next) {
    const email = req.body.email;
    connection.query(
        "SELECT * FROM ProposedLoans where email = ?",[email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            else{
                if(result[0].amount1 == 0 && result[0].amount2 == 0 && result[0].amount3 == 0){
                    res.send({"Calculated":false})
                }
                else{
                    res.send({"Calculated":true})
                }
            }
        }
    )
});

router.post("/ProposedLoansForEmail", function(req, res, next) {
    const email = req.body.email;
    connection.query(
        "SELECT * FROM ProposedLoans where email = ?",[email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            res.send(result[0])
        }
    )
});

router.post("/calculate", function(req, res, next) {
    
    const email = req.body.email

    //logic of calculation start
    
    
    //logic of calculation end

    connection.query(
        "UPDATE ProposedLoans set amount1 = ?,interest1 =? ,amount2 = ?,interest2 = ?,amount3 = ?,interest3 = ? where email = ?",[1,1,1,1,1,1,email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }else{
                connection.query(
                    "Select * from ProposedLoans",[],(err,output) => {
                        res.send(output)
                    }
                )
            }
        }
    )

});

module.exports = router;