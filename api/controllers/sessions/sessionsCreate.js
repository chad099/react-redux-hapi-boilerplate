const joi = require('joi');
const boom = require('boom');
const sessionService = require('../../services/sessionService');
const jwtHelper = require('../../helpers/jwtHelper');

module.exports = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  tags: ['api', 'session'],

  description: 'Create session',

  notes: 'User web login or mobile login',

  validate: {
    query: {
      jwt: joi.number().valid(0, 1).default(0).description('set 1 to get jwt token'),
    },
    payload: {
      email: joi.string().max(250).email().required()
        .description('must be an email.'),
      password: joi.string().required()
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
      .authenticate(payload)
      .then((user) => {
        if(user.isActive===false){
          reply(boom.badRequest('Your account is Inactive, please contact to Admin'));
        }
        else if (request.query.jwt) {
          jwtHelper
            .sign(user)
            .then(accessToken => reply({ user, accessToken }))
            .catch(onError);
        } else {
          request.auth.session.set(user);
          reply({ user });
        }
      })
      .catch(onError);
  },

};
