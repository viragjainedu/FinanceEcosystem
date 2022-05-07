var express = require("express");
var router = express.Router();
var connection = require('../connection');
var async = require('async');

function getInsights(email,borrower_emails,lenders_id, cb) { 
    var insights = [];
    var pending = borrower_emails.length;
 
    for(var i in borrower_emails) {
        connection.query('SELECT * FROM returns WHERE email = ? and borrower_email = ? and lenders_id =?', [ email ,borrower_emails[i],lenders_id ], function(err, result){
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
            if(err){console.log(err)}
            interests.push(result[0].interest1);
            if( 0 === --pending ) {
                cb(interests); //callback if all queries are processed
            }
        });
    }
}

// router.post("/fixed_amount_and_months", function(req, res, next) {
//     const email = req.body.email
//     connection.query("select * from lenders_data where email = ? limit 1 ",[email],(err,response)=>{
//         if(response.length > 0){
//             var data = {}
//             data['fixed_lending_amount'] = response[0].fixed_lending_amount
//             data['months'] = [ ...Array(response[0].lock_in_period).keys() ].map( i => i+1);
//             console.log(data)
//             res.send(data)
//         }else{
//             res.send([])
//         }

//     });
// })

router.post("/", function(req, res, next) {
    const email = req.body.email
    const lenders_id = req.body.lenders_id
    // const email = 'virag.j@somaiya.edu'
    var arr_emails = []
    connection.query("select * from lenders_data where email = ? and lenders_id = ?",[email,lenders_id],(err,response)=>{
        if(err){
            console.log(err)    
        }else if(response.length > 0){
            
            var data = {}
            data['fixed_lending_amount'] = response[0].fixed_lending_amount
            data['months'] = [ ...Array(response[0].lock_in_period).keys() ].map( i => i+1);

            for (let i = 0; i < 10; i++) {
                if(response[0][`b${i}`] !== null){
                    arr_emails.push(response[0][`b${i}`])
                }else{
                    break;
                }
            }
            
            if(arr_emails.length === 0){
                data['insights'] = []    
                data['interests'] = []    

                res.send({insights: data})
            }

            getInsights(email,arr_emails,lenders_id, function(insights){
                data['insights'] = insights    
                
                getInterests(arr_emails,function(interests){
                    data['interests'] = interests    
                    console.log(data)
                    res.send({insights: data});
                })
            });
            
            
        }else{
            res.send([])
        }
    })

});


router.post("/getLents", function(req, res, next) {
    const email = req.body.email
    var lenders_id = []
    connection.query("select * from lenders_data where email = ?",[email],(err,response)=>{
        if(err){
            console.log(err)    
        }else if(response.length > 0){
            for (let i = 0; i < response.length; i++) {
                lenders_id.push(response[i].lenders_id)
            }
            res.send({lenders_id : lenders_id})
        }else{
            res.send({message:"No Lendings"})
        }
    })
});

// router.post("/Interests", function(req, res, next) {
//     const email = req.body.email
//     // const email = 'virag.j@somaiya.edu'
//     var arr_emails = []
//     connection.query("select * from lenders_data where email = ?",[email],(err,response)=>{
//         if(err){
//             console.log(err)
//         }else if(response.length > 0){

//             for (let i = 0; i < 10; i++) {
//                 if(response[0][`b${i}`] !== null){
//                     arr_emails.push(response[0][`b${i}`])
//                 }else{
//                     break;
//                 }
//             }
//             // res.send(arr_emails)
//             getInterests(arr_emails, function(interests){
//                 console.log(interests);
//                 res.send(interests);
//             });
//         }else{
//             res.send([])
//         }
//     })

// });

module.exports = router;