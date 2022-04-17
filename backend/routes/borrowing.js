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
    const annual_income = req.body.annual_income*10;
    const purpose = req.body.purpose;
    const collateral = req.body.collateral;
    const age = req.body.age;
    const collateral_value = req.body.collateral_value;
    const amount_req = req.body.amount_req;
    const contact = req.body.contact;
    const email = req.body.email;
    console.log(req.body);
    console.log("Hiii")


    //Credit Score calculation for grade STARTS
    const x = parseInt(emp_length);
    const ES = -0.025*x*x + x;
    const AS = 15 - 0.25*parseInt(age);
    const IS = Math.log10((100*parseInt(annual_income) )/ 12);
    var PS = 5;
    console.log("Hiii2")
    switch(purpose) {
        case "Education":
            PS = 10;
            break;
        case "House":
            PS = 10;
            break;
        case "Medical":
            PS = 7;
            break;
        case "Travel":
            PS = 5;
            break;
        case "Other":
            PS = 5;
            break;
        default:
            PS = 5;
    }
    console.log("Hiii3")

    const CV = collateral_value;
    const Credit_Score = 10*IS + 5*ES + 5*AS + 3*Math.log10(CV) + PS
    var Loan_Cap = 0.7*CV*100000
    
    if(amount_req < Loan_Cap){
        Loan_Cap = amount_req;
    }

    var GRADE = 'X';
    console.log("Hiii3.5")
    if(Credit_Score >= 85){
        GRADE = 'A';
    }
    else if (Credit_Score >= 70 && Credit_Score < 85){
        GRADE = 'B';
    }
    else if (Credit_Score >= 55 && Credit_Score < 70){
        GRADE = 'C';
    }
    else if (Credit_Score >= 40 && Credit_Score < 55){
        GRADE = 'D';
    }
    else if (Credit_Score >= 25 && Credit_Score < 40){
        GRADE = 'E';
    }
    else if (Credit_Score >= 10 && Credit_Score < 25){
        GRADE = 'F';
    }
    else if (Credit_Score < 10){
        GRADE = 'G';
    }
    console.log("Hiii4")

    console.log(Loan_Cap)
    console.log(Credit_Score);
    console.log(GRADE);

    connection.query(
        "UPDATE person SET emp_length = ?, annual_income = ?, purpose = ?,collateral = ?,age=?,collateral_value=?,amount_req = ?, contact = ?,GRADE = ?,Loan_Cap = ? where email = ? ;",
        [emp_length, annual_income,purpose,collateral,age,collateral_value,amount_req,contact,GRADE,Loan_Cap,email],
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
           
            

            //Credit Score calculation for grade ENDS
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
                if(result.length > 0 ){
                    if(result[0].amount1 == 0 && result[0].amount2 == 0 && result[0].amount3 == 0 && result[0].MailSent == false){
                        res.send({"Calculated":false})
                    }else{
                        res.send({"Calculated":true})
                    }
                }else{
                    res.send({"Calculated":false})
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
            else if(result.length > 0){
                res.send(result[0])
            }else{
                res.send({})
            }
        }
    )
});



router.post("/calculate", function(req, res, next) {
    
    const email = req.body.email

    //logic of calculation start

    connection.query("select * from person where email=?",[email],(err,result)=>{
        if(err){
            console.log(err);
        }else if(result.length > 0){
            console.log(result);
            var loan_cap = result[0].loan_cap
            var GRADE = result[0].GRADE
            console.log(`Loan Cap:${loan_cap}`)
            console.log(`GRADE:${GRADE}`)

                connection.query("Select * from lenders_data ORDER BY fixed_lending_amount DESC",[],(err,result) => {
                    if(err){
                        console.log(err)
                    }
                    else if(result.length > 0 ){
                        var amount_included = 0;
                        for (let i = 0; i < result.length; i++) {
                            if(result[i].amount_remaining == 0){
                                continue;
                            }else{
                                if(result[i].fixed_lending_amount + amount_included <= loan_cap){
                                    amount_included = amount_included + result[i].fixed_lending_amount
                                }
                            }
                        }
                        var FinalLoanAmount = amount_included;
                        console.log(`FinalLoanAmount:${FinalLoanAmount}`)
                        
                        console.log(`GRADE:${GRADE}`)
                        connection.query("select * from interest_rates where GRADE = ?",[GRADE],(err,result) => {
                            if(err){console.log(err)}else{console.log(result)}
                            connection.query(
                                "UPDATE ProposedLoans set amount1 = ?,interest1 =? ,amount2 = ?,interest2 = ?,amount3 = ?,interest3 = ?,amount4 = ?,interest4 = ? where email = ?",
                                [FinalLoanAmount,result[0].months_3 ,FinalLoanAmount,result[0].months_6 ,FinalLoanAmount,result[0].months_12 ,FinalLoanAmount,result[0].months_18 ,email],
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
                        })                    
                    }
                });
        }
    });
    //logic of calculation end

   
});

router.post("/LoanSelection", function(req, res, next) {
    
    const email = req.body.email
    const selectedLoan = req.body.selectedLoan

    connection.query(
        "UPDATE ProposedLoans set selected = ? where email = ?",[selectedLoan,email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }else{

                connection.query("update borrowing_requests set status = 4 where email = ? ",[email],(err,output)=>{
                    res.send({status: "Accepted"})
                })
            }
        }
    )

});

module.exports = router;