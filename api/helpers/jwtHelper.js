const jwt = require('jsonwebtoken');
const config = require('config');

const secret = config.api.secret;

// internals.jwtToken = authData => `Bearer ${jwtHelper.sign(internals.authCredentials(authData))}`;

/**
 * Create a JWT token
 * @param data is a object that we want to pass to token. Note: keep this as short as you can.
 * @param expiresIn time for token to live. Default is 7 days
 */
exports.sign = (data, expiresIn = '7d', algorithm = 'HS256') =>
  Promise.resolve(jwt.sign(data, secret, { algorithm, expiresIn }));


/**
 * Verify if a token is valid or not
 * @param token
 * @return decrypted token object
 */
exports.verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
