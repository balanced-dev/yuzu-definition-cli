const prettier = require("prettier");

module.exports = (config) => {

  config.interceptorsPipeline.push({
      type: 'script',
      order: 6,
      apply: (json, config) => {
          return function(script, cardSettings) {
        
            return prettier.format(script, { semi: false, tabWidth: 4, parser: "js" });
  
          } 
      }
  });

};