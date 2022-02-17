var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/', function(req,res){ 

    connection.query('SELECT * FROM PERSON', function(error,rows,fields){
        if(error){
            console.log('Error aaya')
        }else{
            res.send(rows)
        }
    })
    
})

module.exports = router;