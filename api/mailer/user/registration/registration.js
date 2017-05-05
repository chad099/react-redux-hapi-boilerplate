const smtp = require('../../smtp');
const config = require('config');
const jwt = require('../../../helpers/jwtHelper');

module.exports = (user) => {
  const url = config.url;
  const subject = 'User Registration';
  const token = jwt.sign({ email: user.email, token: user.confirmationToken });
  const verifyLink = `${url}/accounts/email-verification?token=${token}`;
  const model = Object.assign({}, user, { verifyLink });

  return smtp.send(user.email, subject, model, __dirname);
};
