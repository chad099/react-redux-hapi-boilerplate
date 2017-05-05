require('babel-polyfill');
const path = require('path');
const Glue = require('glue');
const i18n = require('i18n');
const Co = require('co');

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

const appHelper = require('./helpers/appHelper');
const logger = require('./helpers/logHelper');

// Glue server
const manifest = require('./manifest');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// Locale Settings
i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: path.resolve(__dirname, 'locales'),
  autoReload: true,
  objectNotation: true
});

Glue.compose(manifest, { relativeTo: path.join(__dirname) }, (err, server) => {
  if (err) {
    console.error(err.stack || err);
    return;
  }

  server.on('log', logger);

  const healthCheck = () => Promise.all([
    appHelper.checkDbConnection(),
  ]);
  server.connection({ routes: { cors: true } });
  // Health route
  server.route({
    path: '/heart-beat',
    method: 'get',
    handler: (request, reply) => {
      healthCheck()
        .then(() => {
          reply('ok');
        })
        .catch(reply);
    },
  });

  // Health route
  server.route({
    path: '/',
    method: 'get',
    handler: (request, reply) => {
      reply(i18n.__('db.error'));
    },
  });

server.register(require('inert'), (err) => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, '../', 'public')
        }
    }
  });
});
  Co(function*() {
    yield require('../plugins/hapi-webpack')(server);
    yield require('../src/server')(server);

    // Check health and START SERVER
    healthCheck()
      .then(() => {
        server.start((healthErr) => {
          if (healthErr) {
            logger.error(healthErr);
            return;
          }
          const info = server.select('api').connections[0].info;
          server.log(['info'], `Web server started at ${info.uri} == Started api at ${info.uri}/documentation ==`);
        });
      })
      .catch(healthErr => server.log(['error'], healthErr));

  }).catch( (e) => {

      server.log('app.js error:',e);
      server.log('stack - ',e.stack);
  });

});
