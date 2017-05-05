/* eslint-disable */
import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const serverCheck = true;

function formatUrl(path) {
  if (/^(\/\/|http|https)/.test(path)) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (serverCheck) {
    // Prepend host and port of the API server to the path.
    return `http://localhost:5000${adjustedPath}`;
  }

  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) => (this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
      const request = superagent[method](formatUrl(path));
      console.log('send data', data)
      if (params) {
        request.query(params);
      }

      if (__SERVER__ && req.get('cookie')) {
        request.set('cookie', req.get('cookie'));
      }

      if (data) {
        request.send(data);
      }

      request.end((err, { body } = {}) => {
        if (err) {
          // Handle joi validation errors.
          if (body && body.validation) {
            const messages = body.message.match(/[^[\]]+(?=])/g);
            const validationErrors = {};
            body.validation.keys.forEach((key, idx) => {
              validationErrors[key] = messages[idx];
            });
            reject({ message: validationErrors });
          } else {
            reject(body || err);
          }
        } else {
          resolve(body);
        }
      });
    })));
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {
  }
}
