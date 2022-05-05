var express = require("express");
var router = express.Router();
var connection = require('../connection');
var async = require('async');

function getInsights(email,borrower_emails, cb) { 
    var insights = [];
    var pending = borrower_emails.length;
 
    for(var i in borrower_emails) {
        connection.query('SELECT * FROM returns WHERE email = ? and borrower_email = ?', [ email ,borrower_emails[i] ], function(err, result){
            insights.push(result);
            if( 0 === --pending ) {
                cb(insights); //callback if all queries are processed
            }
        });
    }
}

function getInterests(borrower_emails, cb) { 
    var interests = [];
    var pending = borrower_emails.length;
 
    for(var i in borrower_emails) {
        connection.query('SELECT * FROM proposedloans WHERE email = ?', [ borrower_emails[i] ], function(err, result){
            interests.push(result[0].interest1);
            if( 0 === --pending ) {
                cb(interests); //callback if all queries are processed
            }
        });
    }
}

router.post("/fixed_amount_and_months", function(req, res, next) {
    const email = req.body.email
    connection.query("select * from lenders_data where email = ? limit 1 ",[email],(err,response)=>{
        if(response.length > 0){
            var data = {}
            data['fixed_lending_amount'] = response[0].fixed_lending_amount
            data['months'] = [ ...Array(response[0].lock_in_period).keys() ].map( i => i+1);
            console.log(data)
            res.send(data)
        }else{
            res.send([])
        }

    });
})

router.post("/", function(req, res, next) {
    const email = req.body.email
    // const email = 'virag.j@somaiya.edu'
    var arr_emails = []
    connection.query("select * from lenders_data where email = ?",[email],(err,response)=>{
        if(err){
            console.log(err)
        }else if(response.length > 0){

            for (let i = 0; i < 10; i++) {
                if(response[0][`b${i}`] !== null){
                    arr_emails.push(response[0][`b${i}`])
                }else{
                    break;
                }
            }
            // res.send(arr_emails)
            getInsights(email,arr_emails, function(insights){
                console.log(insights);
                res.send(insights);
            });
        }else{
            res.send([])
        }
    })

});

router.post("/Interests", function(req, res, next) {
    const email = req.body.email
    // const email = 'virag.j@somaiya.edu'
    var arr_emails = []
    connection.query("select * from lenders_data where email = ?",[email],(err,response)=>{
        if(err){
            console.log(err)
        }else if(response.length > 0){

            for (let i = 0; i < 10; i++) {
                if(response[0][`b${i}`] !== null){
                    arr_emails.push(response[0][`b${i}`])
                }else{
                    break;
                }
            }
            // res.send(arr_emails)
            getInterests(arr_emails, function(interests){
                console.log(interests);
                res.send(interests);
            });
        }else{
            res.send([])
        }
    })

});

module.exports = router;