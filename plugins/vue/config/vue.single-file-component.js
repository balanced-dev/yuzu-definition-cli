const prettier = require("prettier");

module.exports = (config) => {


  config.markup.settings.fileExtension = ".vue";
  config.markup.settings.initialContent = function (options) {
    return `<script>\n`+
              `export default {\n`+
                `props: <!-- YUZU PROPS -->\n`+
              `};\n`+
            `</script>\n`+
            `<template>\n`+
              `<div class=\"${options.className}\">\n`+
                `<!-- YUZU MARKUP -->\n`+
              `</div>\n`+
            `</template>\n`+
            `<style lang="scss">\n`+
              `/* YUZU STYLE */\n`+
            `</style>\n`;
  };


  config.createThese = ['directories','data', 'markup']; 

  config.resetInterceptorsOfType('markup');

  config.interceptorsPipeline.push({
      type: 'markup',
      order: 5,
      apply: (json, config) => {
          return function(html, cardSettings) {
          
            let markupGeneration = config.generators.markup.run(html, cardSettings, json, config);
            
            let defaultScss = config.style.settings.initialContent(cardSettings);
            let style = config.generators.style.run(defaultScss, cardSettings, markupGeneration.content, config);
            let output =  markupGeneration.full.replace('/* YUZU STYLE */', style);
    
            const schemaProcess = config.creators.find((item) => { return item.name == 'schema'; });
            if(schemaProcess) {
              let defaultSchema = schemaProcess.module.initialContent(cardSettings);
              let schema = config.generators.schemaCleanup.processProperties(defaultSchema, json);
              output = output.replace('<!-- YUZU PROPS -->', config.plugins.propsFromSchema(schema));
            }
            else {
              output = output.replace('<!-- YUZU PROPS -->', '{}');
            }
    
            return output;
          } 
      }
  });

  config.plugins.propsFromSchema = require('../generation/plugins/vuePropsFromSchema');

};
