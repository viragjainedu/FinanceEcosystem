var express = require('express');
var router = express.Router();
var connection = require('../connection');
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    connection.query(
        "SELECT * FROM person WHERE email = ? AND password = ?",
        [email, password],
        (err, result)=> {
            console.log(result)
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.send({message:result[0]});
            }
            else{
                res.send({WrongMessage:"Wrong credentials bro"})   
            }
        }
    )
});

router.get('/', function(req,res){ 
    res.json({})
})

module.exports = router;