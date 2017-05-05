const assert = require('assert');
const i18n = require('../helpers/i18nHelper');
const db = require('../db').db;
const cryptoHelper = require('../helpers/cryptoHelper');
const logger = require('../helpers/logHelper');
const User = db.models.User;

exports.findSessionUser = sessionData =>
  new Promise((resolve, reject) => {
    User.findOne({
        where: { id: sessionData.id },
      })
      .then(resolve)
      .catch(reject);
  });

exports.createNewUser = (payload) => new Promise(function(resolve, reject) {
  User.findOne({where: {email:payload.email}})
    .then((user) => {
      if(user) {
        reject('Email already exists.');
      } else {
        cryptoHelper
          .genSalt()
          .then(salt => cryptoHelper.hashStringWithSalt(payload.password, salt))
          .then(({ hash, salt }) => {
            payload.hash = hash;
            payload.salt = salt;
            // Saved user to DB
            return User.create(payload);
          })
          .then(resolve)
          .catch(reject);
      }
    })
    .catch(reject);
});

const Internal = {};

/**
 * Authenticate a user by its username and plain password
 * @param username
 * @param password
 */

exports.authenticate = (userData) => new Promise((resolve, reject) => {

  const invalidMsg = () => {
    reject(i18n('services.sessionService.wrongUsernamePassword'));
  };

  User
    .findOne({ where: { email: userData.email }})
    .then((foundUser) => {
      // Username invalid
      if (!foundUser) {
        invalidMsg();
      } else {
        const userSalt = foundUser.salt;
        const userPassHash = foundUser.hash;
        cryptoHelper
          .hashStringWithSalt(userData.password, userSalt)
          .then((hashData) => {
            if (userPassHash === hashData.hash) {
              delete foundUser.hash;
              delete foundUser.salt;
              resolve(foundUser.toJSON());
            }
            else {
              invalidMsg();
            }
          })
          .catch(reject);
      }
    })
    .catch(reject);

});
