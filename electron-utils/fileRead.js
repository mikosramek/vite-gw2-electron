const fs = require('fs');
const path = require('path');

const filePath = path.join(require('os').homedir() + '/.gw2goals/');

function write (data, filename) {
  fs.writeFile(filePath + filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Can't write to ${filePath}`);
      throw err;
    }
  });
}

function checkForFile (filename, baseData = {}) {
  return new Promise((resolve) => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    fs.stat(filePath + filename, (err) => {
      if (err) {
        write(baseData, filename);
        resolve(false);
      }
      else {
        resolve(true);
      }
    });
  });
}

function read (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      filePath + filename,
      'utf-8',
      (err, data) => {
        if (err) {
          fs.mkdir(filePath, {}, (err) => {
            if (err) {
              write();
              throw err;
            }
          });
          reject(err);
        }
        else {
          resolve(JSON.parse(data));
        }
      }
    );
  });
}

module.exports = {
  read,
  write,
  checkForFile
};
