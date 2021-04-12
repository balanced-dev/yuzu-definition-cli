

module.exports = (config) => {
 
  config.style.settings.classNameDivider = '__';
  config.style.settings.backupRefArrayChildClass = 'item';
  config.style.settings.initialStyle = function(options) {
    return `.${options.className} {\n\n}`;
  };

  config.creators.push({ name: 'scss', module: require('../../../creation/creators/scss') });
  config.plugins.buildClass = require("../../../generation/plugins/style/buildClass");

};
