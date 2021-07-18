const fs = require('fs');
const path = require('path');

const loggerPath = path.join(__dirname, 'logStream.log');
const logger = fs.createWriteStream(loggerPath, { flags: 'a' });

module.exports.logger = logger;
