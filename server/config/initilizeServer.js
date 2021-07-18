const chalk = require('chalk');

const port = process.env.PORT || 3232;
const initilizeServer = (app) => {
  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV}`);
    console.log(`Server listening on port ${chalk.green.italic(port)}`);
  });
};

module.exports.initilizeServer = initilizeServer;
