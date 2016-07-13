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
        res.status(405).send({errmsg:'Invalid method'});
    })
    .post(function (req, res, next) {
        logic.createUser(req.body.username,req.body.password).then(function (result) {
            res.send(result);
        },function (error) {
            if (process.env.NODE_ENV == 'development') {
                console.log(error.errmsg);
            }
            res.status(409).send(error);
        });
    })
    .delete(function (req, res, next) {
        res.status(405).send({errmsg:'Invalid method'});
    });
router.route('/:username')
    .get(function (req, res, next) {
        logic.getUserByName(req.params.username).then(function (result) {
            res.send(result);
        }, function (error) {
            if (process.env.NODE_ENV == 'development') {
                console.log(error.errmsg);
            }
            res.status(500).send(error)
        });
    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {
        logic.deleteUser(req.params.username).then(function (result) {
            res.send(result);
        }, function (error) {
            if (process.env.NODE_ENV == 'development') {
                console.log(error.errmsg);
            }
            res.status(500).send(error)
        })
    });

module.exports = router;