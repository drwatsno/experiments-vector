"use strict";
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    app = express();


class Application {
    constructor ( options ) {
        this.config = options.config;
        this.resourcePaths = options.resourcePaths||['public'];
        this.viewEngine = options.viewEngine||'jade';
        this.enabledModules = options.enabledModules;
        this._appInstance = app;
    }
    addResourcePaths ( paths ) {
        for (let sPath of paths) {
            app.use(express.static(path.join(__dirname, sPath)));
        }
    }
    enableModules ( modules ) {
        for (let sModule of modules) {
            let requireModule = require('../modules/'+sModule+'/controller');
            app.use('/'+sModule, requireModule);
        }
    }
    init () {
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', this.viewEngine);

        
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(require('less-middleware')(path.join(__dirname, 'public')));

        this.addResourcePaths(this.resourcePaths);
        this.enableModules(this.enabledModules);

        
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

    }
}

module.exports = Application;