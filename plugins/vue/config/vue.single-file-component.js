
module.exports = (config) => {


  config.markup.settings.fileExtension = ".vue";
  config.markup.settings.initialMarkup = function (options) {
    return `<script>\nexport default {\nprops: <!-- YUZU PROPS -->\n};\n</script>\n<template>\n<div class=\"${options.className}\">\n<!-- YUZU MARKUP -->\n</div>\n</template>\n<style lang="scss">\n<!-- YUZU STYLE -->\n</style>\n`;
  };


  config.createThese = ['directories','data', 'markup']; 

  config.getInterceptors = function(json, config, data, schemaCleanup, markup, scss) {

    const schemaProcess = config.creators.find((item) => { return item.name == 'schema'; })
    const prettier = require("prettier");

    return {        
      data: function() {
          return data.removeDataStructureRefs(json, config); 
      },
      dataForSchemaGeneration: json,
      markup: function(html, cardSettings) {
          let markupGeneration = markup.run(html, cardSettings, json, config);
          
          let defaultScss = config.style.settings.initialStyle(cardSettings);
          let style = scss.run(defaultScss, cardSettings, markupGeneration.content, config);
          let output =  markupGeneration.full.replace('<!-- YUZU STYLE -->', style);

          let defaultSchema = schemaProcess.module.initialContent(cardSettings);
          let schema = schemaCleanup.processProperties(defaultSchema, json);
          output = output.replace('<!-- YUZU PROPS -->', config.plugins.propsFromSchema(schema));

          output = prettier.format(output, { semi: false, tabWidth: 4, parser: "vue" });

          return output;
      }
    }

  };

  config.plugins.propsFromSchema = require('../generation/plugins/vuePropsFromSchema');

};
