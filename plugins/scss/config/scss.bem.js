module.exports = (config) => {
  config.style.settings.fileExtension = '.scss';
  config.style.settings.initialContent = function(options) {
    return `.${options.className} {\n` +
              `$this: '.${options.className}';\n\n` +

              `/* YUZU STYLE */` +
            `}`;
  };

  config.generators.style = require('./scss.bem.style');
};