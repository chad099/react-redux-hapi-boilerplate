const smtp = require('../../smtp');
const config = require('config');
module.exports = (data) => {
  const subject = 'Order Confirmation';
  const model = Object.assign({}, data);
        model.serverUrl = config.hostDetail.hostName;

  return smtp.send(model.user.email, subject, model, __dirname);
};
