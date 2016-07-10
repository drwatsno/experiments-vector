var express = require('express');
var router = express.Router();
var logic = require(__dirname+'/'+'logic');

router.route('/')
    .get(function (req, res, next) {
        logic.getUsers().then(function (result) {
            res.json(result);
        });
    })
    .put(function (req, res, next) {
        logic.createUser(req.query.name,req.query.password).then(function (result) {
            res.send(result);
        },function (error) {
            res.send(error);
        });
    })
    .post(function (req, res, next) {
        next(new Error('not implemented'))
    })
    .delete(function (req, res, next) {
        logic.deleteUser(req.query.name).then(function (result) {
            res.send(result);
        }, function (error) {
            res.send(error);
        })
    });

router.get(/\/id.+/, function (req, res, next)  {
    logic.getUserById(req.url.replace('\/id','')).then(function (result) {
        res.json(result);
    })
});

module.exports = router;