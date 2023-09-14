const fs = require('fs');
const path = require('path');

function logRequests(req, res, next) {
  const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  logStream.write(logMessage, (error) => {
    if (error) {
      console.error('Error writing to log file:', error);
    }
  });

  next();
}

module.exports = logRequests;
