var ENV_CONFIG_LOOKUP = {
  development: 'dev',
  production: 'prod'
};
var ENV = ENV_CONFIG_LOOKUP[process.env.NODE_ENV||'dev']||'dev';
module.exports = require('./webpack.'+ENV+'.js');
