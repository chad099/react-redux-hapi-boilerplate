module.exports = {
  development: {
    username: 'root',
    password: '#chad099',
    database: 'cdp',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'sim_erp_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    host: process.env.DB_HOST || 'sample',
    database: process.env.DB || 'sample',
    username: process.env.DB_USER || 'sample',
    password: process.env.DB_PWD || 'sample',
    dialect: 'mysql'
  }
};
