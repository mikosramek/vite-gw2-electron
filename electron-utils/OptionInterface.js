const { read, write, checkForFile } = require('./fileread');
const { fileName } = require('../config.settings');
const baseOptions = require('../baseOptions.json');

class OptionInterface {
  constructor () {
    this.optionObject = {};
  }
  eventHandlers() {
    return {
      setup : this.setupData,
      set   : this.updateOptions,
      get   : this.options
    };
  }
  async setupData () {
    try {
      this.optionObject = baseOptions;
      const optionsExist = await checkForFile(fileName, baseOptions);
      if (optionsExist) {
        this.optionObject = await read(fileName);

        // check for differences
        const newOptions = { ...this.optionObject };
        for (const [ key, value ] of Object.entries(baseOptions)) {
          if (!this.optionObject[key]) {
            newOptions[key] = value;
          }
        }
        write(newOptions, fileName);
      }
    }
    catch (error) {
      console.error('Options.js@setupData:', error.message);
      return error;
    }
  }
  updateOptions (newOptions = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.optionObject = {
          ...this.options,
          ...newOptions
        };
        write(this.optionObject, fileName);
        resolve(true);
      }
      catch (error) {
        console.error('OptionInterface.js@:', error.message);
        reject(error);
      }
    });
  }
  get options () {
    return this.optionObject;
  }
}

module.exports = new OptionInterface();
