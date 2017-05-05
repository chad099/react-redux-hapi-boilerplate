const Sequelize = require('sequelize');
const settings = require('config').db;
const db = new Sequelize(settings.database, settings.username, settings.password, {
  host: settings.host,
  dialect: settings.dialect,
  pool: {
    max: 5,
    min: 0,
  },
});

db.models = {};
db.models.User = require('./models/User')(db);
// Export
module.exports.db = db;
