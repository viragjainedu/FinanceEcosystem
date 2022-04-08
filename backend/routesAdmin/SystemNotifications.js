var express = require("express");
var router = express.Router();
var connection = require('../connection')


router.post("/", function(req, res, next) {
    const SystemNotification = req.body.SystemNotification;
    const CurrentTimeStamp = new Date();

    connection.query(
        "INSERT INTO system_notifications (Message, Not_Time) VALUES (?,?)",
        [SystemNotification,CurrentTimeStamp],
        (err, result)=> {
          console.log(result);
          res.send({"success":"User Registered Succesfully"})
        }
      );
});

module.exports = router;