var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    var now = new Date();

    res.send(now.toISOString().slice(0, 19).replace('T', ' '));
});

module.exports = router;