const db = require('./db');
const path = require('path');
module.exports = {
  api: {
    host: 'localhost',
    port: 5000,
    secret: 'YFbDVqRxWuaTwtrCkO3nV0Nw5se1BxYVDkv14nHdJib24FV8nhmhRgols0Y9'
  },
  db: db.development,
  client: {
    webRoot: 'public'
  },
  appointmentLimit: 10
};
