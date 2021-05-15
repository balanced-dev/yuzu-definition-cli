const prettier = require("prettier");

module.exports = (config) => {


  config.interceptorsPipeline.push({
      type: 'style',
      order: 6,
      apply: (json, config) => {
          return function(style, cardSettings) {
        
            return prettier.format(style, { semi: false, tabWidth: 4, parser: "css" });
  
          } 
      }
  });

};