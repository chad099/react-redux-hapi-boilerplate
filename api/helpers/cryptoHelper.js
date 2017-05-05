const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Generate a random string
 */
exports.genSalt = () =>
  new Promise((resolve, reject) => {
    bcrypt
      .genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(salt);
      });
  });


/**
 * Hash a string with random salt
 * @param str to hash
 * @returns {salt, hash}
 */
exports.hashString = str =>
  new Promise((resolve, reject) => {
    exports
      .genSalt()
      .then((salt) => {
        bcrypt.hash(str, salt, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }

          resolve({ salt, hash });
        });
      })
      .catch(reject);
  });


/**
 * Hash string with a given salt
 * @param str to hash
 * @param salt be used to hash string
 */
exports.hashStringWithSalt = (str, salt) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(str, salt, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ salt, hash });
    });
  });
