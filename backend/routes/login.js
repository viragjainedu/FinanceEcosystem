var express = require('express');
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    connection.query(
        "SELECT * FROM person WHERE email = ?",
        [email],
        async (err, result)=> {
            // console.log(result)
            if (err) {
                console.log({err: err});
                res.send({err: err});
            }
            else if (result && result.length > 0) {
                const validPassword = await bcrypt.compare(password, result[0].password);
                if(validPassword){
                    
                    connection.query("update last_login set isLoggedIn = true, last_login = ? where email = ?",[moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),email],(err,output)=>{
                        if(err){console.log(err)}else{
                            console.log(output)
                            res.send({message:result[0]});
                        }
                    })
                }else{
                    res.send({WrongMessage:"Wrong credentials bro"})   
                }
            }
            else{
                res.send({WrongMessage:"Wrong credentials bro"})   
            }
        }
    )
});

router.post('/last_login', function(req,res){ 
    const email = req.body.email
    console.log(req.body)
    connection.query("select * from last_login where email = ?",[email],(err,result)=>{
        if(err){console.log(err)}
        else if(result.length > 0){
            var todays_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            var difference = moment.duration(moment(todays_date).diff(moment(result[0].last_login))).asMinutes();
            console.log(difference)
            if(result[0].isLoggedIn){
                if(difference < 30){
                    console.log(difference)
                    res.send({success:true})
                }else{
                    // console.log(difference)
                    connection.query("update last_login set isLoggedIn = false where email = ?",[email],(err,output)=>{
                        if(err){console.log(err)}else{
                            res.send({message:"Session expired"})
                        }
                    })
                }
            }else{
                res.send({message:"Session Expired"})
            }
        }else{
            res.send({message : "Session expired"})
        }
    })
})

router.post('/logout', function(req,res){ 
    const email = req.body.email
    // console.log(req.body)
    connection.query("update last_login set isLoggedIn = false where email = ?",[email],(err,result)=>{
        if(err){console.log(err)}
        else if(result.length > 0){
            res.send({success:true})
        }else{
            res.send({message : "Something went wrong"})
        }
    })
})

module.exports = router;