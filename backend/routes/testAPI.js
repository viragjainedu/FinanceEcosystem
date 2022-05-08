var express = require("express");
var router = express.Router();
var async = require('async');
var connection = require('../connection');
const cron = require('node-cron');
var moment = require('moment');
const bcrypt = require("bcrypt");

router.get("/", function(req, res, next) {
    connection.beginTransaction(function(err){
        if(err){
            console.log(err)
        }else{

            connection.query("select * from person where email = '1virag.j'",(err,result)=>{
                if(err){
                    connection.rollback(function() {res.send({message:err})})
                    // res.send({"err":"errr"})
                }else{
                    console.log(result)
                    connection.commit(function(){
                        res.send({"message":"Hii"})
                    })
                }
            })

        }
    })
});

//rollback commit example
// router.get("/", function(req, res, next) {
//     connection.beginTransaction(function(err){
//         if(err){
//             console.log(err)
//         }else{

//             connection.query("select * from person where email = '1virag.j'",(err,result)=>{
//                 if(err){
//                     connection.rollback(function() {res.send({message:err})})
//                     // res.send({"err":"errr"})
//                 }else{
//                     console.log(result)
//                     connection.commit(function(){
//                         res.send({"message":"Hii"})
//                     })
//                 }
//             })

//         }
//     })
// });

module.exports = router;