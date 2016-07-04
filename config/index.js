var nconf = require('nconf'),
    path = require('path');

// load nconf

nconf.argv()
    .env()
    .file({ file: path.join(__dirname,'server.json') });

module.exports = nconf;