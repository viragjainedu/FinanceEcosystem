var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("This statement is generate by SearchResult API backend");
});

module.exports = router;