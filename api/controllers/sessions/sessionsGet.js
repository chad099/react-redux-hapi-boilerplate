module.exports = {
  tags: ['api', 'session'],

  description: 'GET session user',

  notes: 'Returns logged in session user',

  handler: (request, reply) => {
    request.server.auth.test('default', request, (err, credentials) => {
      if (err) {
        return reply({ user: null, message: err });
      }
      return reply({ user: credentials });
    });
  },
};
