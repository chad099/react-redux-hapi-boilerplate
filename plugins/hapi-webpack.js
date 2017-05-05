// modified from https://github.com/SimonDegraeve/hapi-webpack-plugin
// modified to surface the webpackHotMiddleware and webpackDevMiddleware
'use strict';

const internals = {};

const Path = require('path');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');


/**
 * Define plugin
 */
internals.register = function register(server, options, next) {
    // Define variables
    let config = {};
    let compiler = undefined;

    // console.log('options:',options);
    // Require config from path
    if (typeof options === 'string') {
        const configPath = Path.resolve(process.cwd(), options);
        config = require(configPath);
        compiler = new Webpack(config);
    } else
    {
        config = options;
        compiler = config.compiler;
    }
  // Create middlewares
    const webpackDevMiddleware = WebpackDevMiddleware(compiler, config.devOptions);
    const webpackHotMiddleware = WebpackHotMiddleware(compiler, config.hotOptions);
    // Handle webpackDevMiddleware
    server.ext('onRequest', function (request, reply) {
        const req = request.raw.req;
        const res = request.raw.res;

        webpackDevMiddleware(req, res, function (error) {
            if (error) {
                return reply(error);
            }
            reply.continue();
        });
    });

    // Handle webpackHotMiddleware
    server.ext('onRequest', function (request, reply) {

        const req = request.raw.req;
        const res = request.raw.res;

        webpackHotMiddleware(req, res, function (error) {
            if (error) {
                return reply(error);
            }
            reply.continue();
        });
    });

    // Expose compiler
    server.expose({ compiler: compiler ,  hotMiddleware: webpackHotMiddleware, devMiddleware: webpackDevMiddleware});
    // Done
    return next();
};

/**
 * Define plugin attributes
 */
internals.register.attributes = {
    name: 'UzysWebpackMiddleware',
    version: '0.1'
};

module.exports = function(server) {

    return new Promise(function(resolve,reject) {

        server.register({
            register: internals.register,
            options: './webpack/webpack.client.js'
        }, function(err){
            if (err) reject(err);
            else {
                server.log(['info', 'plugin'], 'plugin: hapi-webpack-plugin registered');
                resolve();
            }
        });
    });
};
