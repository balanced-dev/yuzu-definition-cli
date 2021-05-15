const beautify_html = require('js-beautify').html;

module.exports = (config) => {

  config.interceptorsPipeline.push({
      type: 'markup',
      order: 6,
      apply: (json, config) => {
          return function(hbs, cardSettings) {
        
            return beautify_html(hbs, { indent_size: 4 })
  
          } 
      }
  });

};