const ENV = process.NODE_ENV || 'development';

// Log server.log
module.exports = (event, tags) => {
  if (tags.info) {
    console.info(event.data);
  }

  if (tags.log) {
    console.log(event.data);
  }

  if (tags.warn) {
    console.warn(event.data);

    // TODO: email admin on warn;
  }

  if (tags.error) {
    console.error(event.data);

    // TODO: email admin on error.
  }

  if ((ENV === 'development' || process.env.DEBUG) && tags.debug) {
    console.log(event.data);
  }
};


module.exports.info = (msg, ...args) => {
  console.info(msg, ...args);
};

module.exports.log = (msg, ...args) => {
  console.log(msg, ...args);
};

module.exports.warn = (msg, ...args) => {
  console.warn(msg, ...args);
};

module.exports.error = (err) => {
  console.error(err.stack || err);
};
