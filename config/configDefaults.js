const creation = require('./defaultPlugins/creation');
const generation = require('./defaultPlugins/generation');
const markup = require('./defaultPlugins/markup');
const style = require('./defaultPlugins/style');
const script = require('./defaultPlugins/script');
const schema = require('./defaultPlugins/schema');
const logger = require('./defaultModules/logger');

module.exports = () => {

  var config = {
    plugins: {}
  };

  creation(config);
  generation(config);
  markup(config);
  style(config);
  script(config);
  schema(config);
  logger(config);

  return config;
} 
