const accountService = require('../../services/accountService');
const i18n = require('i18n');
const path = require('path');
const mailer = require('../../mailer');
const constants = require('../../constants');


i18n.configure({
  directory: path.resolve(__dirname, '../../', 'locales'),
  objectNotation: true
});

module.exports = {
  up: () => new Promise((resolve, reject) => {

    const adminUser = {
      email: 'niteshk@swiftsetup.com',
      password: "gungun",
      role: constants.ROLES.ADMIN
    };
    const user = {
      email: 'frankestine4@gmail.com',
      password: "gungun",
      role: constants.ROLES.USER,
      isActive: true
    };
    const adminProfile = { firstName: 'Nick', lastName: 'Walter' };

    const userProfile = { firstName: 'Frankestine', lastName: 'Keller', mobile: 9878338781 };

    accountService
      .createAdmin(adminUser, adminProfile)
      .then(() => {
        accountService.createUser(user, userProfile)
          .then(resolve)
          .catch(reject);
        })
      // .then(mailer.userRegistration)
      .then(resolve)
      .catch(reject);

  }),

  down: () => { }
};