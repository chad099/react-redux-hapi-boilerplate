const config = require('config');
const rootPackage = require('../package.json');
const constants = require('./constants');
const Path  =  require("path");
module.exports = {
  connections: [
    { labels: ['api'], host: config.api.host, port: config.api.port,
    routes: {
           files: {
               relativeTo: Path.join(__dirname, '../', 'public')
           }
       }
    },

  ],

  registrations: [

    { plugin: { register: 'inert' } }, // required by hapi-swagger

    { plugin: { register: 'vision' } }, // required by hapi-swagger

    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: `${rootPackage.name} Documentation`,
            version: rootPackage.version,
            contact: {
              name: 'CHAD',
              email: 'shekharsingh099@gmail.com',
            },
          },
        },
      },
    },

    {
      plugin: {
        register: 'yar',
        options: {
          storeBlank: false,
          cookieOptions: {
            password: config.api.secret,
            isSecure: false,
            isHttpOnly: true,
          },
        },
      },
    },

    {
      plugin: {
        register: './plugins/auth',
        options: {
          secret: config.api.secret,
          isSecure: false,
        },
      },
    },

    {
      plugin: {
        register: 'hapi-authorization',
        options: {
          roles: constants.ROLES_LIST,
        },
      },
    },

    {
      plugin: {
        register: 'hapi-router',
        options: {
          cwd: __dirname,
          routes: 'controllers/**/*Controller.js',
        },
      },
    },

    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                  response: '*',
                  error: '*',
                  log: '*',
                }],
              },
              {
                module: 'good-console',
              },
              'stdout',
            ],
          },
        },
      },
    },

  ],

};
