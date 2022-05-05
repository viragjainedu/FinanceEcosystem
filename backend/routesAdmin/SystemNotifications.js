var express = require("express");
var router = express.Router();
var connection = require('../connection')
var moment = require('moment')


router.post("/", function(req, res, next) {
    const SystemNotification = req.body.SystemNotification;

    connection.query(
        "INSERT INTO system_notifications (message, not_time) VALUES (?,?)",
        [SystemNotification,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
        (err, result)=> {
          // console.log(result);
          res.send({"Message":"Notification sent"})
        } 
      );
});

router.post("/getNotification", function(req, res, next) {
    const email = req.body.email;

    connection.query("select last_not_opened from person where email = ?",[email],(err,output)=>{
      // console.log(err)
      if(err){
        console.log(err)
      }else{
        if(output.length > 0 ){
          var last_not_opened = output[0].last_not_opened
          connection.query(
            "Select * from system_notifications where not_time > ? order by not_time desc",
            [last_not_opened],
            (err, result)=> {
              // console.log(result);
              res.send({notifications:result})
            } 
          );
        }else{
          res.send([])
        }
      }
    })
});

router.post("/getReadNotification", function(req, res, next) {
    const email = req.body.email;

    connection.query("select last_not_opened from person where email = ?",[email],(err,output)=>{
      // console.log(err)
      if(output.length >0){
        var last_not_opened = output[0].last_not_opened
        connection.query(
          "Select * from system_notifications where not_time < ?  order by not_time desc",
          [last_not_opened],
          (err, result)=> {
            // console.log(result);
            res.send({read_notifications:result})
          } 
        );
      }else{
        res.send([])
      }

    })
});

router.post("/setLatestNotTime", function(req, res, next) {
    const email = req.body.email;

    connection.query(
        "update person set last_not_opened = ? where email = ?",
        [moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),email],
        (err, result)=> {
          // console.log(result);
          res.send({success:true})
        } 
      );
});

router.get("/notifications", function(req, res, next) {

    connection.query(
        "select * from system_notifications order by not_time desc",
        [],
        (err, result)=> {
          res.send(result)
        } 
      );
});

module.exports = router;