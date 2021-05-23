const buildClass = require('../services/buildClass');

module.exports = (config) => {

    config.generators.style = require('../../generation/generators/style/style');
    config.createThese.push('style');
    config.creators.push({ 
        name: 'style', 
        module: require('../../creation/creators/style') 
    });

    config.style = {
        settings: {
            filePrefix: '',
            fileExtension: '.css',
            subdirectory: '',
            classNameDivider: '__',
            backupRefArrayChildClass: 'item',
            initialContent: function(options) {
                return `.${options.className} {\n\n`+
                
                `}\n\n` +
                
                `/* YUZU STYLE */`;
            }
        },
        appendChildContextClass: buildClass.appendChildContextClass,
        generateClassString: buildClass.generateClassString
    };
  
    config.interceptorsPipeline.push({
        type: 'style',
        order: 5,
        apply: (json, config) => {
            return function(styles, cardSettings) {
                return config.generators.style.run(styles, cardSettings, cardSettings.markup, config);
            } 
        }
    });

};