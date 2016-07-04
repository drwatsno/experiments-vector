var config = require('./config');
var Application = require("./core");
var app = new Application({
  config: config,
  resourcePaths: [
      'public',
      'node_modules/react/dist',
      'node_modules/react-dom/dist'
  ],
  enabledModules: [
      'user',
      'index'
  ]
});

app.init();
module.exports = app._appInstance;
