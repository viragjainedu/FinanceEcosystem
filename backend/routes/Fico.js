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
    const answer7a =  req.body.answer7a;   
    const answer9 =  req.body.answer9;    
    const answer10a =  req.body.answer10a;

    var BS = 600;
    var a1,a1a,a2,a3,a4,a5,a6,a7,a7a,a9,a10a = 0;

    if(answer1 === "1.1"){
        a1=0;
    }
    else if(answer1 === "1.2"){
        a1=0;
    }
    else if(answer1 === "1.3"){
        a1=5;
    }
    else if(answer1 === "1.4"){
        a1=10;
    }
    else{
        a1 =0;
    }

    if(answer1a === "1a.1"){
        a1a=10;
    }
    else if(answer1a === "1a.2"){
        a1a=20;
    }
    else if(answer1a === "1a.3"){
        a1a=30;
    }
    else if(answer1a === "1a.4"){
        a1a=40;
    }
    else if(answer1a === "1a.5"){
        a1a=50;
    }
    else if(answer1a === "1a.6"){
        a1a=60;
    }
    else if(answer1a === "1a.7"){
        a1a=70;
    }
    else if(answer1a === "1a.8"){
        a1a=80;
    }
    else if(answer1a === "1a.9"){
        a1a=90;
    }
    else{
        a1a = 0;
    }
// answer 2
    if(answer2 === "2.1"){
        a2 = 15;
    }
    else if(answer2 === "2.2"){
        a2 = 20;
    }
    else if(answer2 === "2.3"){
        a2 = 25;
    }
    else if(answer2 === "2.4"){
        a2 = 30;
    }
    else if(answer2 === "2.5"){
        a2 = 35;
    }
    else if(answer2 === "2.6"){
        a2 = 40;
    }
    else{
        a2 = 0;
    }

    if(answer3 === "3.1"){
        a3 = -5;
    }
    else if(answer3 === "3.2"){
        a3 = -10;
    }
    else if(answer3 === "3.3"){
        a3 = -15;
    }
    else if(answer3 === "3.4"){
        a3 = -20;
    }
    else if(answer3 === "3.5"){
        a3 = -25;
    }
    else{
        a3 = 0;
    }

    if(answer4 === "4.1"){
        a4 = 0;
    }
    else if(answer4 === "4.2"){
        a4 = 0;
    }
    else if(answer4 === "4.3"){
        a4 = 5;
    }
    else{
        a4 = 0;
    }

    if(answer5 === "5.1"){
       a5 = -5; 
    }
    else if(answer5 === "5.2"){
       a5 = -10; 
    }
    else if(answer5 === "5.3"){
        a5 = -15;
    }
    else if(answer5 === "5.4"){
        a5 = -25;
    }
    else{
        a5 = 0;
    }

    if(answer6 === "6.1"){
        a6 = 18;
    }
    else if(answer6 === "6.2"){
        a6 = 15;    
    }
    else if(answer6 === "6.3"){
        a6 = 12;
    }
    else if(answer6 === "6.4"){
        a6 = 9;
    }
    else if(answer6 === "6.5"){
        a6 = 6;
    }
    else if(answer6 === "6.6"){
        a6 = 3;
    }
    else if(answer6 === "6.7"){
        a6 = 0;
    }
    else{
        a6 = 0;
    }

    if(answer9 === "9.1"){
        a9 = 20;
    }
    else if(answer9 === "9.2"){
        a9 = 12;
    }
    else if(answer9 === "9.3"){
        a9 = 3;
    }
    else if(answer9 === "9.4"){
        a9 = -5;
    }
    else if(answer9 === "9.5"){
        a9 = -14;
    }
    else if(answer9 === "9.6"){
        a9 = -22;
    }
    else if(answer9 === "9.7"){
        a9 = -31;
    }
    else if(answer9 === "9.8"){
        a9 = -39;
    }
    else if(answer9 === "9.9"){
        a9 = -48;
    }
    else if(answer9 === "9.10"){
        a9 = -65;
    }
    else{
        a9 = 0;
    }

    if(answer10a === "10a.1"){
        a10a = -25;
    }
    else if(answer10a === "10a.2"){
        a10a = -50; 
    }
    else if(answer10a === "10a.3"){
        a10a = -100;
    }
    else{
        a10a = 0;
    }

    if(answer7 === "7.2"){
        a7 = -120;
    }
    else if(answer7 === "7.3"){
        a7 = -115; 
    }
    else if(answer7 === "7.4"){
        a7 = -100;
    }
    else if(answer7 === "7.5"){
        a7 = -40;
    }
    else if(answer7 === "7.6"){
        a7 = -35;
    }
    else if(answer7 === "7.7"){
        a7 = -30;
    }
    else if(answer7 === "7.8"){
        a7 = -30;
    }
    else{
        a7 = 0;
    }

    if(answer7 === "7.2" || answer7 === "7.4" && answer7a === "7a.1"){
        a7a = -6;
    }
    else if(answer7 === "7.2" || answer7 === "7.4" && answer7a === "7a.2"){
        a7a = -12;
    }
    else if(answer7 === "7.2" || answer7 === "7.4" && answer7a === "7a.3"){
        a7a = -18;
    }
    else if(answer7 === "7.2" || answer7 === "7.4" && answer7a === "7a.4"){
        a7a = -25;
    }
    else{
        a7a = 0;
    }

    if(answer7 === "7.3" && answer7a === "7a.1"){
        a7a = -7;
    }
    else if(answer7 === "7.3" && answer7a === "7a.2"){
        a7a = -15;
    }
    else if(answer7 === "7.3" && answer7a === "7a.3"){
        a7a = -22;
    }
    else if(answer7 === "7.3" && answer7a === "7a.4"){
        a7a = -30;
    }
    else{
        a7a = 0;
    }  

    if(answer7 === "7.5" || answer7 === "7.6" && answer7a === "7a.1"){
        a7a = -21;
    }
    else if(answer7 === "7.5" || answer7 === "7.6" && answer7a === "7a.2"){
        a7a = -42;
    }
    else if(answer7 === "7.5" || answer7 === "7.6" && answer7a === "7a.3"){
        a7a = -63;
    }
    else if(answer7 === "7.5" || answer7 === "7.6" && answer7a === "7a.4"){
        a7a = -85;
    }
    else{
        a7a = 0;
    }

    if(answer7 === "7.7" && answer7a === "7a.1"){
        a7a = -22;
    }
    else if(answer7 === "7.7" && answer7a === "7a.2"){
        a7a = -45;
    }
    else if(answer7 === "7.7" && answer7a === "7a.3"){
        a7a = -67;
    }
    else if(answer7 === "7.7" && answer7a === "7a.4"){
        a7a = -90;
    }
    else{
        a7a = 0;
    }

    
    if(answer7 === "7.8" && answer7a === "7a.1"){
        a7a = -18;
    }
    else if(answer7 === "7.8" && answer7a === "7a.2"){
        a7a = -37;
    }
    else if(answer7 === "7.8" && answer7a === "7a.3"){
        a7a = -56;
    }
    else if(answer7 === "7.8" && answer7a === "7a.4"){
        a7a = -75;
    }
    else{
        a7a = 0;
    }

    var FS = BS+a1+a1a+a2+a3+a4+a5+a6+a7+a7a+a9+a10a;
    console.log(FS);
    console.log(a1);
    console.log(a1a);
    console.log(a2);
    console.log(a3);
    console.log(a4);
    console.log(a5);
    console.log(a6);
    console.log(a7);
    console.log(a7a);
    console.log(a9);
    console.log(a10a);
});



module.exports = router;