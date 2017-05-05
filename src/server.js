import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import ApiClient from '../src/helpers/ApiClient';
import createStore from '../src/redux/create';
import { createMemoryHistory } from 'history';
import  MainRoute from '../src/routes/index';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
const client = new ApiClient();
const Config  = require('config');
const Path    = require('path');
const webRoot = Config.client.webRoot;

module.exports = function(server) {

    return new Promise(function(resolve,reject) {

        try {

            server.ext('onRequest', function (request, next) {
                console.info('Inbound started: ', {'Correlation-Id': request.id, 'URL': request.url.href});
                return next.continue();
            });

            server.ext('onPreResponse', function (request, reply) {
                  let parts = request.url.path.split('/');
                  if (typeof request.response.statusCode !== "undefined") {
                    return reply.continue();
                  }

                  //check if its a api request
                  if(parts[1] === 'api') {
                    return reply.continue();
                  }

                  //check if server request client pages
                  const isIndexRoute = (parts[1] !== 'api') && (getExtension(parts[parts.length - 1]) === '');
                  if(!isIndexRoute) {
                    return reply.continue();
                  }

                  request.server.auth.test('default', request, (err, credentials) => {
                    let authuser = null;
                    if (err) {
                      console.log('User not login redirect to login page');
                    } else {
                      authuser = credentials;
                    }

                    const history = createMemoryHistory(request.url.path);
                    const store = createStore(history, client);
                    const initialState = store.getState();
                    initialState.auth.user = authuser;
                    const context = {};
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                          <StaticRouter
                            location={request.url.path}
                            context={context}
                          >
                            <MainRoute history={history}/>
                          </StaticRouter>
                        </Provider>
                      );
                      let output = (
                        `<!doctype html>
                        <html lang="en-us">
                          <head>
                            <meta charset="utf-8">
                            <title>Ortho | USS</title>
                            <link rel="stylesheet" href="/css/app.css">
                          </head>
                          <body>
                            <div id="root" style="height:100%;">${html}</div>
                            <script>
                              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
                              window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
                            </script>
                            <script src=/app.js></script>
                          </body>
                        </html>`
                        );
                      reply(output);

                  });
          });
          server.views({
              engines: {
                  html: {
                      compile: (template, compileOptions)=>{
                          return (context, renderOptions)=>{
                              return template;
                          }
                      }
                  }
              },
              relativeTo: webRoot,
              path: './'
          });
        }
        catch (e) {
            reject(e);
        }
        server.log(['info', 'plugin'], 'plugin: react-settings registered');
        resolve();
    });


};

function getExtension(filename) {
    let ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}
