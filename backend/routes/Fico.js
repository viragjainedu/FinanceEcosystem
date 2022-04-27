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
    const answer8 =  req.body.answer8;   
    const answer8a =  req.body.answer8a;    
    const answer9 =  req.body.answer9;    
    const answer10 =  req.body.answer10;    
    const answer10a =  req.body.answer10a;

    var BS = 600;
    var a1,a1a,a2,a3,a4,a5,a6,a7,a7a,a9,a10a = 0;

    switch(answer1) {
        case "1.1":
            a1 = 0;
            break;
        case "1.2":
            a1 = 0;
            break;
        case "1.3":
            a1 = 5;
            break;
        case "1.4":
            a1 = 10;
            break;
        default:
            a1 = 0;
    }

    switch(answer1a) {
        case "1.1":
            a1a = 10;
            break;
        case "1a.2":
            a1a = 20;
            break;
        case "1a.3":
            a1a = 30;
            break;
        case "1a.4":
            a1a = 40;
            break;
        case "1a.5":
            a1a = 50;
            break;
        case "1a.6":
            a1a = 60;
            break;
        case "1a.7":
            a1a = 70;
            break;
        case "1a.8":
            a1a = 80;
            break;
        case "1a.9":
            a1a = 90;
            break;
        default:
            a1a = 0;
    }

    switch(answer2) {
        case "2.1":
            a2 = 15;
            break;
        case "2.2":
            a2 = 20;
            break;
        case "2.3":
            a2 = 25;
            break;
        case "2.4":
            a2 = 30;
            break;
        case "2.5":
            a2 = 35;
            break;
        case "2.6":
            a2 = 40;
            break;
        default:
            a2 = 0;
    }

    switch(answer3) {
        case "3.1":
            a3 = -5;
            break;
        case "3.2":
            a3 = -10;
            break;
        case "3.3":
            a3 = -15;
            break;
        case "3.4":
            a3 = -20;
            break;
        case "3.5":
            a3 = -25;
            break;
        default:
            a3 = 0;
    }

    switch(answer4) {
        case "4.1":
            a4 = 0;
            break;
        case "4.2":
            a4 = 0;
            break;
        case "4.3":
            a4 = 5;
            break;
        default:
            a4 = 0;
    }

    switch(answer5) {
        case "5.1":
            a5 = -5;
            break;
        case "5.2":
            a5 = -10;
            break;
        case "5.3":
            a5 = -15;
            break;
        case "5.4":
            a5 = -25;
            break;
        default:
            a5 = 0;
    }

    switch(answer6) {
        case "6.1":
            a6 = 18;
            break;
        case "6.2":
            a6 = 15;
            break;
        case "6.3":
            a6 = 12;
            break;
        case "6.4":
            a6 = 9;
            break;
        case "6.5":
            a6 = 6;
            break;
        case "6.6":
            a6 = 3;
            break;
        case "6.7":
            a6 = 0;
            break;
        default:
            a6 = 0;
    }

    switch(answer9) {
        case "9.1":
            a9 = 20;
            break;
        case "9.2":
            a9 = 12;
            break;
        case "9.3":
            a9 = 3;
            break;
        case "9.4":
            a9 = -5;
            break;
        case "9.5":
            a9 = -14;
            break;
        case "9.6":
            a9 = -22;
            break;
        case "9.7":
            a9 = -31;
            break;
        case "9.8":
            a9 = -39;
            break;
        case "9.9":
            a9 = -48;
            break;
        case "9.10":
            a9 = -65;
            break;
        default:
            a9 = 0;
    }

    switch(answer10a) {
        case "10a.1":
            a10a = -25;
            break;
        case "10a.2":
            a10a = -50;
            break;
        case "10a.3":
            a10a = -100;
            break;
        default:
            a10a = 0;
    }

    switch(answer7) {
        case "7.2":
            a7 = -120;
            switch(answer7a) {
                case "7a.1":
                    a7a = -6;
                    break;
                case "7a.2":
                    a7a = -12;
                    break;
                case "7a.3":
                    a7a = -18;
                    break;
                case "7a.4":
                    a7a = -25;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.3":
            a7 = -115;
            switch(answer7a) {
                case "7a.1":
                    a7a = -7;
                    break;
                case "7a.2":
                    a7a = -15;
                    break;
                case "7a.3":
                    a7a = -22;
                    break;
                case "7a.4":
                    a7a = -30;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.4":
            a7 = -100;
            switch(answer7a) {
                case "7a.1":
                    a7a = -6;
                    break;
                case "7a.2":
                    a7a = -12;
                    break;
                case "7a.3":
                    a7a = -18;
                    break;
                case "7a.4":
                    a7a = -25;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.5":
            a7 = -40;
            switch(answer7a) {
                case "7a.1":
                    a7a = -21;
                    break;
                case "7a.2":
                    a7a = -42;
                    break;
                case "7a.3":
                    a7a = -63;
                    break;
                case "7a.4":
                    a7a = -85;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.6":
            a7 = -35;
            switch(answer7a) {
                case "7a.1":
                    a7a = -21;
                    break;
                case "7a.2":
                    a7a = -42;
                    break;
                case "7a.3":
                    a7a = -63;
                    break;
                case "7a.4":
                    a7a = -85;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.7":
            a7 = -30;
            switch(answer7a) {
                case "7a.1":
                    a7a = -22;
                    break;
                case "7a.2":
                    a7a = -45;
                    break;
                case "7a.3":
                    a7a = -67;
                    break;
                case "7a.4":
                    a7a = -90;
                    break;
                default:
                    a7a = 0;
            }
            break;

        case "7.8":
            a7 = -30;
            switch(answer7a) {
                case "7a.1":
                    a7a = -18;
                    break;
                case "7a.2":
                    a7a = -37;
                    break;
                case "7a.3":
                    a7a = -56;
                    break;
                case "7a.4":
                    a7a = -75;
                    break;
                default:
                    a7a = 0;
            }
            break;

        default:
            a7 = 0;
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
    // console.log(a8);
    console.log(a9);
    // console.log(a10);
    console.log(a10a);
});



module.exports = router;