var express = require("express");
var router = express.Router();
var connection = require('../connection');

router.post("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");
    const email = req.body.email;

    connection.query(
        "Select * from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                res.send(result[0])
            }else{
                res.send({})
            }
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/total_money_lent", function(req, res, next) {

    const email = req.body.email 
    
    connection.query(
        "Select total_money_lent from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                // console.log(result)
                res.send({total : result[0].total})
            }
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/balance", function(req, res, next) {
    
    const email = req.body.email ;
    
    connection.query(
        "Select balance from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                // console.log(result)
                res.send({total : result[0].balance})
            }else
                res.send({total:0})
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/prev_transactions", function(req, res, next) {
    
    const email = req.body.email ;
    connection.query(
        "Select transaction_time ,NULL AS 'amount_borrowed', amount_lent , email_id  from lending_transactions where email_id = ? UNION Select transaction_time ,amount_borrowed,NULL AS 'amount_lent',  email_id from borrowing_transactions where email_id = ? ORDER BY transaction_time DESC;",
        [email,email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                // console.log(result)
                res.send(result)
            }else
                res.send([])
        }
      );

});

router.post("/admin_stats", function(req, res, next) {
    
    var data = {}
    getCompletedLoans((CompletedLoans)=>{
        data['CompletedLoans'] = CompletedLoans
        getDefaultLoans((DefaultLoans)=>{
            data['DefaultLoans'] = DefaultLoans
            getTotalLoans((TotalLoans)=>{
                data['TotalLoans'] = TotalLoans
                data['ActiveLoans'] = TotalLoans - parseInt(data['CompletedLoans']) - parseInt(data['DefaultLoans'])
                getTotalLenders((TotalLenders)=>{
                    data['TotalLenders'] = TotalLenders
                    getTotalBorrowers((TotalBorrowers)=>{
                        data['TotalBorrowers'] = TotalBorrowers
                        res.send(data)
                    })
                })  
            })    
        })
    })

    
});

function getDefaultLoans(callback){

    connection.query("Select * from (select * from installments where status = 'Defaulted') a group by a.email;",(err, result)=> {
        if(err){
            console.log(err);
        }else{
            callback(result.length)
        }
    });

}
function getCompletedLoans(callback){
    connection.query("Select * from completedloans group by email",(err, result)=> {
        if(err){
            console.log(err);
        }else{
            callback(result.length)
        }
    });
}

function getTotalLoans(callback){
    connection.query("Select * from installments group by email",(err, result)=> {
        if(err){
            console.log(err);
        }else{
            callback(result.length)
        }
    });
}

function getTotalLenders(callback){
    connection.query("Select * from lenders_data",(err, result)=> {
        if(err){
            console.log(err);
        }else{
            callback(result.length)
        }
    });
}

function getTotalBorrowers(callback){
    connection.query("Select * from borrowing_transactions",(err, result)=> {
        if(err){
            console.log(err);
        }else{
            callback(result.length)
        }
    });
}


module.exports = router;