const jwtHelper = require('../api/helpers/jwtHelper');

jwtHelper
  .sign({ name: 'aa' }, '3s')
  .then((token) => {
    console.log(token);
    setTimeout(() => {
      console.log('Verify');
      jwtHelper
        .verify(token)
        .then(console.log)
        .catch(console.error);
    }, 2000)
  })
  .catch(console.err);
