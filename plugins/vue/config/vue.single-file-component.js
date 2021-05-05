const prettier = require("prettier");

module.exports = (config) => {


  config.markup.settings.fileExtension = ".vue";
  config.markup.settings.initialMarkup = function (options) {
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

  config.interceptorsPipeline.push({
      name: 'vue-single-file',
      apply: (interceptors, json, config) => {
          interceptors.style = null;
          interceptors.schema = null;
          interceptors.markup = function(html, cardSettings) {
            const schemaProcess = config.creators.find((item) => { return item.name == 'schema'; });

            let markupGeneration = config.generators.markup.run(html, cardSettings, json, config);
            
            let defaultScss = config.style.settings.initialStyle(cardSettings);
            let style = config.generators.style.run(defaultScss, cardSettings, markupGeneration.content, config);
            let output =  markupGeneration.full.replace('/* YUZU STYLE */', style);
    
            let defaultSchema = schemaProcess.module.initialContent(cardSettings);
            let schema = config.generators.schemaCleanup.processProperties(defaultSchema, json);
            output = output.replace('<!-- YUZU PROPS -->', config.plugins.propsFromSchema(schema));
    
            output = prettier.format(output, { semi: false, tabWidth: 4, parser: "vue" });
    
            return output;
          } 
      }
  });

  config.plugins.propsFromSchema = require('../generation/plugins/vuePropsFromSchema');

};
