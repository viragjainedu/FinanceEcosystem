var express = require("express");
var router = express.Router();
// const { spawn } = require('child_process');

router.get("/", function(req, res, next) {
    // res.send("This statement is generate by Investment Advisor API backend");
    var arg1=5;
    var arg2=6;
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python',["C:\Users\virag\Desktop\LY\FinalYearProject\Gtihub\FinanceEcosystem\python.py", arg1, arg2]);
    pythonProcess.stdout.on('data', (data) => {
  // Do something with the data returned from python script
    console.log(data);
    res.send(data);
    res.end('end');
});

});

module.exports = router;