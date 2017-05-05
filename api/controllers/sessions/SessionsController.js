module.exports = [

  {
    path: '/api/sessions',
    method: 'GET',
    config: require('./sessionsGet'),
  },
  {
    path: '/api/sessions',
    method: 'POST',
    config: require('./sessionsCreate'),
  },

  {
    path: '/api/sessions',
    method: 'DELETE',
    config: require('./sessionsDestroy'),
  },
  {
    path: '/api/session/register',
    method: 'POST',
    config: require('./register')
  }

];
