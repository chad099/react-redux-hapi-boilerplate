const db = require('../db').db;
const logger = require('./logHelper');


exports.checkDbConnection = () => new Promise((resolve, reject) => {
  db
    .authenticate()
    .then(() => {
      const response = 'Connection has been established successfully.';
      logger.info(response);
      resolve(response);
    })
    .catch(reject);
});
