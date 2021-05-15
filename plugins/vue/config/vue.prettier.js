const prettier = require("prettier");

module.exports = (config) => {

  config.interceptorsPipeline.push({
      type: 'markup',
      order: 6,
      apply: (json, config) => {
          return function(html, cardSettings) {
        
            return prettier.format(html, { semi: false, tabWidth: 4, parser: "vue" });
    
          } 
      }
  });

};
