var express = require('express');
var router = express.Router();
var logic = require(__dirname+'/'+'logic');

/* GET users listing. */
router.get('/', function(req, res, next) {
    logic.getUsers().then(function (result) {
        res.send(result);
    })
});

router.get(/\/id.+/, function (req, res, next)  {
    logic.getUserById(req.url.replace('\/id','')).then(function (result) {
        res.send(result);
    })
});

module.exports = router;