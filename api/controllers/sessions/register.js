const joi = require('joi');
const boom = require('boom');
const sessionService = require('../../services/sessionService');
const jwtHelper = require('../../helpers/jwtHelper');
const db = require('../../db').db;
const User = db.models.User;

module.exports = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  tags: ['api', 'session'],

  description: 'Create user',

  notes: 'create user and login',

  validate: {
    payload: {
      email: joi.string().max(250).email().required()
        .description('must be an email.'),
      firstname: joi.string(),
      password: joi.string().min(3).max(15).required(),
    },
    options: { abortEarly: false },
  },

  handler: (request, reply) => {
    const payload = request.payload;
    const onError = (err) => {
      request.server.log(['error'], err);
      reply(boom.badRequest(err));
    };
    sessionService
      .createNewUser(payload)
      .then((user) => {
        sessionService
          .authenticate(payload)
          .then((user) => {
            request.auth.session.set(user);
            reply({ user });
          })
          .catch(onError);
      })
      .catch(onError);
  },

};
