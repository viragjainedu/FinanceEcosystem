var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment')
var nodemailer = require('nodemailer');


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
        connection.query("select month_req from person where email = ?",[email],(err,result) => {
            if(err){console.log(err)}
            else{
                connection.query("INSERT INTO ProposedLoans (month_req,email,amount1,interest1,selected,rejected,MailSent,Time,isTransacted) values(?,?,?,?,?,?,?,?,?)",
                    [result[0].month_req,email,0,0,0,null,0,moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),0],
                    (err,output) => {
                        if(err){
                            console.log(err)
                            res.send(err)
                        }else if (output.length > 0 ){
                            res.send({"success": "ok"});
                        }
                    }
                )
            }
        })        
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
            }else{
                res.send({"success": "ok"});
            }
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
    const age = req.body.age;
    const collateral_value = req.body.collateral_value;
    const amount_req = req.body.amount_req;
    const month_req = req.body.month_req;
    const contact = req.body.contact;
    const email = req.body.email;
    // console.log(req.body);
    // console.log("Hiii")


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
    // console.log("Hiii3")

    connection.query("select * from fico_score where email = ?",[email] , (err,rows)=>{
        if(err){console.log(err)}
        else{
            if(rows.length > 0 ){
                var CV = collateral_value;
                var Credit_Score = rows[0].FS  +  4*(0.6*IS + 4*ES + 1.3*AS + 3*Math.log10(CV) + PS)
                var Loan_Cap = 0.7*CV*100000
                
                if(amount_req < Loan_Cap){
                    Loan_Cap = amount_req;
                }
            
                var GRADE = 'X';
                console.log("Hiii3.5")
                if(Credit_Score >= 800){
                    GRADE = 'A';
                }
                else if (Credit_Score >= 740 && Credit_Score < 800){
                    GRADE = 'B';
                }
                else if (Credit_Score >= 700 && Credit_Score < 740){
                    GRADE = 'C';
                }
                else if (Credit_Score >= 670 && Credit_Score < 700){
                    GRADE = 'D';
                }
                else if (Credit_Score >= 625 && Credit_Score < 670){
                    GRADE = 'E';
                }
                else if (Credit_Score >= 580 && Credit_Score < 625){
                    GRADE = 'F';
                }
                else if (Credit_Score < 580){
                    GRADE = 'G';
                }
                console.log("Hiii4")
            
                console.log(Loan_Cap)
                console.log(Credit_Score);
                console.log(GRADE);
            
                connection.query(
                    "UPDATE person SET emp_length = ?, annual_income = ?, purpose = ?,collateral = ?,age=?,collateral_value=?,amount_req = ?,month_req = ?, contact = ?,GRADE = ?,Loan_Cap = ? where email = ? ;",
                    [emp_length, annual_income,purpose,collateral,age,collateral_value,amount_req,month_req,contact,GRADE,Loan_Cap,email],
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
            
                            //send mail
                                        
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                user: 'virag.j@somaiya.edu',
                                pass: 'dontopenthis12345'
                                }
                            });
                            
                            
                            var mailOptions = {
                                from: 'virag.j@somaiya.edu',
                                to: email,
                                subject: 'Physical Verification of your details will take place soon',
                                text: 'You can visit http://localhost:3000/borrowing for more details.'
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                res.send({error:error})
                                } else {
                                console.log('Email sent: ' + info.response);
            
                                    res.send({"success":"Updated Succesfully"})
            
                                }
                            });
                        }
                        );
                        //INSERTING IN BORROWING REQUESTS ENDS
                       
            
                        //Credit Score calculation for grade ENDS
                    }
                  );
                // res.send({"Profile Recieved":"Yes"})
            }
        }
    })


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
            }else{
                res.send(result)
            }
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
                    if(result[0].amount1 == 0 && result[0].interest1 == 0 && result[0].MailSent == false){
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


router.post("/transact", function(req, res, next) {
    const email = req.body.email;
    const selected = req.body.selected;
    const rejected = req.body.rejected;
    const amount_req = req.body.amount;
    // const month_req = req.body.month_req;
    if(selected === 0 && rejected === null){
        res.send({message:"Please let user accept loan"})
    }else if(rejected ===1){
        res.send({message:"User has rejected the loan"})
    }else{
        connection.query(
            "select * from lenders_data ",[],(err,result) => {
                if(err){
                    res.send({err:err})
                }else if(result && result.length > 0 ) {
                    for (let i = 0; i < result.length; i++) {
                        
                        var borrowerNo = -1;
                        //calculating borrowerNo
                        for (let j = 0; j < 10; j++) {
                            if(result[i][`b${j}`] ===  email){
                                borrowerNo = j;
                                break;
                            }
                        }
                        
                        // console.log(`Borrower : ${borrowerNo}.`)
                        if(borrowerNo === -1){
                            continue;
                        }
                        else if(borrowerNo !== -1){
                            console.log(`Borrower No is : ${borrowerNo}`)
                            var grade;
                            connection.query("select grade from person where email = ?",[email],(err,res) => {
                                if(err){console.log(err)}
                                grade = res[0].grade
                                console.log(grade)
                                var amount;
                                connection.query("select * from proposedloans where email = ?",[email],(err,res) => {
                                    if(err){console.log(err)}
                                    amount = res[0][`amount${res[0].selected}`]
                                    // console.log(amount)
                                    // console.log(`B.No is - ${borrowerNo}`)
                        
                                    //calculating borrowerNo
                                    for (let j = 0; j < 10; j++) {
                                        if(result[i][`b${j}`] ===  email){
                                            borrowerNo = j;
                                            break;
                                        }
                                    }
                                    if(borrowerNo !== -1){
                                        connection.query(`update lenders_data set amount_lent =?, b${borrowerNo}_amount = ?,b${borrowerNo}_grade = ? where lenders_id= ?`,
                                            [result[i].amount_lent - result[i].fixed_lending_amount ,amount,grade ,result[i].lenders_id],
                                            (err,output) => {
                                                console.log(`BorrowerNo: ${borrowerNo}`)
                                                if(err){
                                                    console.log(err)
                                                }else{
                                                    connection.query('update proposedloans set isTransacted = 1 where email = ?',[email],(err,res)=>{
                                                        if(err){console.log(err)}
                                                        // console.log(res)
                                                        // we've transacted set 1 
                                                    })
                                                }
        
                                            }
                                    );
    
                                    }
    
                                    })
                            })
                        }
                    }
                    //updating borrowing transaction table 
                    connection.query('insert into borrowing_transactions (transaction_time,email_id,amount_borrowed) values(?,?,?)',
                    [moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),email,amount_req],
                    );

                    //updating balance in account stats table 
                    connection.query("select * from account_stats where email = ?",[email],(err,result)=>{
                        connection.query('update account_stats set balance = ? , total_money_borrowed = ? where email = ?',
                        [parseInt(result[0].balance) + amount_req , parseInt(result[0].total_money_borrowed) + amount_req,email],
                        (err,output)=>{
                            if(err){console.log(err)}
                            if(output){
                                // console.log(output)
                            }
                        })
                    })
    
                    //calculating no of months  to insert in installments table
                    // var no_of_months;
                    // if(selected ==1){no_of_months = 3}else if(selected == 2){no_of_months=6}else if(selected == 3){no_of_months=12}else if(selected == 4){no_of_months=18}
                    
                    //calculating interest_rate to insert in installments table
                    connection.query(`select * from proposedLoans where email = ? ` , [email], (err,result) => {
                        if(err){console.log(err)}
                        for (var i = 1; i <= result[0].month_req; i++) {
                            //updating installments table 
                            var interest_rate = result[0][`interest1`]
                            var a = amount_req
                            var n = result[0].month_req
                            if(n === 18){
                                var r = (interest_rate*18/12)/(n*100)
                            }else{
                                var r =  interest_rate/(n*100)
                            }
                            var numerator = a * r* Math.pow((1+r),n ) ;
                            var denominator = Math.pow((1+r),n) - 1 ;
                            var installment_amount = numerator/denominator ;
                            // console.log(`${a},${n},${r},${numerator},${denominator},${installment_amount},`);
                            var date_of_payment = moment(new Date()).add(i, 'M').format('YYYY-MM-DD HH:mm:ss');   
                            console.log(date_of_payment)
                            connection.query("insert into installments (email,amount_borrowed,no_of_months,interest_rate,installment_amount,installment_no,date_of_payment,time_of_payment,status) values(?,?,?,?,?,?,?,?,?)",
                            [email,amount_req,result[0].month_req,interest_rate,installment_amount,i,date_of_payment,null,'Pending'],(err,output)=>{
                                if(err){console.log(err)}
                            })                    
                        }
                    })
                    
    
                }else{
                    res.send({err:"No result"})
                }
            }
    
        );
    }
    
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
            var month_req = result[0].month_req
            console.log(`Loan Cap:${loan_cap}`)
            console.log(`GRADE:${GRADE}`)
            console.log(`month_req:${month_req}`)

                connection.query(`Select * from lenders_data where lock_in_period = ${result[0].month_req} ORDER BY fixed_lending_amount DESC`,[],(err,result) => {
                    if(err){
                        console.log(err)
                    }
                    else if(result.length > 0 ){
                        var amount_included = 0;
                        for (let i = 0; i < result.length; i++) {
                            if(result[i].amount_remaining == 0){
                                continue;
                            }else{

                                if((GRADE === 'A' || GRADE === 'B' || GRADE === 'C') && result[i].v1 > 0){

                                    if(result[i].fixed_lending_amount + amount_included <= loan_cap){
                                        amount_included = amount_included + result[i].fixed_lending_amount
    
                                        var leastBorrowerNo = 0;
                                        //calculating borrowerNo
                                        for (let j = 0; j < 10; j++) {
                                            if(result[i][`b${j}`] ===  null){
                                                leastBorrowerNo = j;
                                                break;
                                            }
                                        }
                                        console.log(`borrowerNo: ${leastBorrowerNo}`)
                                        connection.query(`UPDATE  lenders_data set amount_remaining = ?, b${leastBorrowerNo} = ? ,v1 = ? where lenders_id = ?`,
                                        [result[i].amount_remaining-result[i].fixed_lending_amount ,email,result[i].v1-1, result[i].lenders_id]),
                                        (err,out)=>{
                                            if(err){console.log(err)}
                                            
                                        }
                                    }
                                    
                                }else if(( GRADE === 'D' || GRADE === 'E' || GRADE === 'F' || GRADE ==='G') && result[i].v2 > 0){
                                    
                                    if(result[i].fixed_lending_amount + amount_included <= loan_cap){
                                        amount_included = amount_included + result[i].fixed_lending_amount
    
                                        var leastBorrowerNo = 0;
                                        //calculating borrowerNo
                                        for (let j = 0; j < 10; j++) {
                                            if(result[i][`b${j}`] ===  null){
                                                leastBorrowerNo = j;
                                                break;
                                            }
                                        }
                                        console.log(`borrowerNo: ${leastBorrowerNo}`)
                                        connection.query(`UPDATE  lenders_data set amount_remaining = ?, b${leastBorrowerNo} = ? ,v2 = ? where lenders_id = ?`,
                                        [result[i].amount_remaining-result[i].fixed_lending_amount ,email,result[i].v2-1, result[i].lenders_id]),
                                        (err,out)=>{
                                            if(err){console.log(err)}
                                            
                                        }
                                    }
                                    
                                }
                            }
                        }
                        var FinalLoanAmount = amount_included;
                        console.log(`FinalLoanAmount:${FinalLoanAmount}`)
                        
                        //if no lenders can satisy borrowers needs
                        if(FinalLoanAmount === 0){
                            res.send({message:"No Lender could satisfy your borrowing request currently"})
                        }else{
                            connection.query("select * from interest_rates where GRADE = ?",[GRADE],(err,result) => {
                                if(err){console.log(err)}
                                else{console.log(result)}
                                var interest = result[0][`months_${month_req}`]
                                connection.query(
                                    "UPDATE ProposedLoans set amount1 = ?,interest1 =? where email = ?",
                                    [FinalLoanAmount,interest,email],
                                    (err, result)=> {
                                        if (err) {
                                            res.send({err: err});
                                        }else{
                                            connection.query("Update proposedloans set isCalculated = true where email = ?",[email],(err,output)=>{
                                                connection.query(
                                                    "Select * from ProposedLoans",[],(err,output) => {
                                                        res.send(output)
                                                        console.log(output)
                                                    }
                                                )
                                            })
                                        }
                                    }
                                )
                            })
                        }
                    
                    }else{
                        res.send({message:'No Lenders available;'})
                    }
                });
        }
    });
    //logic of calculation end

   
});

router.post("/LoanRejection", function(req, res, next) {
    
    const email = req.body.email;
    const month_req = req.body.month_req;

    connection.query(`Select * from lenders_data where lock_in_period = ${month_req};`,[],(err,result)=>{
        if(err){
            console.log(err)
        }else if(result.length > 0 ){
            for (let i = 0; i < result.length; i++) {

                var leastBorrowerNo = 0;
                //calculating borrowerNo
                for (let j = 0; j < 10; j++) {
                    if(result[i][`b${j}`] ===  email){
                        leastBorrowerNo = j;
                        break;
                    }
                }
                connection.query(`UPDATE  lenders_data set amount_remaining = ?, b${leastBorrowerNo} = ?  where lenders_id = ?`,
                [result[i].fixed_lending_amount+result[i].amount_remaining ,null, result[i].lenders_id]),
                (err,out)=>{
                    if(err){console.log(err)}
                            
                    }
            }
        
        }
    })

    connection.query(
        "UPDATE ProposedLoans set rejected = 1 where email = ?",[email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }else{

                connection.query("update borrowing_requests set status = 4 where email = ? ",[email],(err,output)=>{
                    res.send({status: "Rejected"})
                })
            }
        }
    )

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