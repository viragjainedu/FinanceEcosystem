var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("This statement is generate by Advance Insights API backend");
});

module.exports = router;