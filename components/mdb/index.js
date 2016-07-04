var mongoose = require('mongoose'),
    config = require('../../config');

mongoose.connect('mongodb://'+config.get("db"));

module.exports = mongoose;