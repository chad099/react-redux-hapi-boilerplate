const assert = require('assert');
const Boom = require('boom');
const i18n = require('../helpers/i18nHelper');
const jwtHelper = require('../helpers/jwtHelper');
const sessionService = require('../services/sessionService');

const internals = {};

exports.register = (server, options, next) => {
  server.auth.scheme('simAuth', internals.implementation);
  server.expose('jwtToken', internals.jwtToken);

  // Auth config
  const api = server.select('api');
  api.auth.strategy('default', 'simAuth', 'try', {
    secret: options.secret,
    isSecure: options.isSecure,
  });

  next();
};

exports.register.attributes = {
  name: 'simAuth',
};


internals.implementation = (server, options) => {
  assert(options, 'options not defined');
  assert(options.secret, 'options.secret is missing');

  const settings = Object({ sessionKey: 'sid' }, options);

  settings.sessionKey = 'AUTH_USER';
  internals.settings = settings;

  server.ext('onPreAuth', (request, reply) => {
    request.auth.session = {
      user: null,
      set: (user) => {
        request.yar.set(settings.sessionKey, internals.authCredentials(user));
        reply(user);
      },
      clear: () => {
        request.yar.clear(settings.sessionKey);
      },
    };

    return reply.continue();
  });

  return { authenticate: internals.authenticate };
};

internals.authCredentials = user => ({ id: user.id, role: user.role });

internals.authenticate = (request, reply) => {
  const unauthorized = (err) => {
    reply(Boom.unauthorized(err || ''));
  };

  const authorize = (authData) => {
    if (!authData || typeof authData !== 'object') {
      reply(Boom.badImplementation('No auth data'));
      return;
    }

    sessionService
      .findSessionUser(authData)
      .then((user) => {
        if (!user) {
          unauthorized(i18n('plugins.auth.invalid')); // invalid session data
          return;
        }
        // Authenticated
        reply.continue({ credentials: user });
      })
      .catch(Boom.internal);
  };

  const authHeader = request.raw.req.headers.authorization;
  if (authHeader) { // jwt token based session
    internals
      .jwtScheme(authHeader)
      .then(authorize)
      .catch(unauthorized);
  } else {  // Cookie based session
    const authData = request.yar.get(internals.settings.sessionKey);
    if (authData) {
      authorize(authData);
    } else {
      unauthorized(i18n('plugins.auth.expired'));
    }
  }
};

internals.jwtScheme = jwtTotken =>
  new Promise((resolve, reject) => {
    if (!jwtTotken) {
      reject(i18n('plugins.auth.missingToken'));
      return;
    }

    const parts = jwtTotken.split(/\s+/);

    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer' || parts[1].split('.').length !== 3) {
      reject(i18n('plugins.auth.invalidToken'));
      return;
    }

    const token = parts[1];
    jwtHelper
      .verify(token)
      .then(resolve)
      .catch((err) => {
        if (err && err.message === 'jwt expired') {
          reject(i18n('plugins.auth.expired'));
        }

        reject(err);
      });
  });
