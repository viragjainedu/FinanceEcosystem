var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("This statement is generate by Fico API backend");
});

router.post("/", function(req, res, next) {
    
    const email = req.body.email;
    const answer1 =  req.body.answer1;  
    const answer1a =  req.body.answer1a;    
    const answer2 =  req.body.answer2;     
    const answer3 =  req.body.answer3;    
    const answer4 =  req.body.answer4;   
    const answer5 =  req.body.answer5;   
    const answer6 =  req.body.answer6;   
    const answer7 =  req.body.answer7;   
    const answe7a =  req.body.answe7a;   
    const answer8 =  req.body.answer8;   
    const answer8a =  req.body.answer8a;    
    const answer9 =  req.body.answer9;    
    const answer10 =  req.body.answer10;    
    const answer10a =  req.body.answer10a;

    
});

module.exports = router;