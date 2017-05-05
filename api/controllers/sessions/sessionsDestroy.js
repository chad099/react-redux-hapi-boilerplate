
module.exports = {
  auth: 'default',

  tags: ['api', 'session'],

  description: 'Destroy session',

  notes: 'Logout user from system',

  handler: (request, reply) => {
    request.auth.session.clear();
    reply({ success: true });
  },
};
