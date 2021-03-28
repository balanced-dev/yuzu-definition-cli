

module.exports = (config) => {
 
  config.markupSettings.classNameDivider = '__';
  config.markupSettings.backupRefArrayChildClass = 'item';
  config.markupSettings.initialStyle = function(options) {
    return `.${options.className} {\n\n}`;
  };

  config.processors.push({ name: 'scss', module: require('../../creation/creators/scss') });
  config.plugins.buildClass = require("../../generation/plugins/style/buildClass");

};
