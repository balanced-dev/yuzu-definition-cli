const creation = require('./defaultPlugins/creation');
const generation = require('./defaultPlugins/generation');
const directories = require('./defaultPlugins/directories');
const data = require('./defaultPlugins/data');
const markup = require('./defaultPlugins/markup');
const style = require('./defaultPlugins/style');
const script = require('./defaultPlugins/script');
const schema = require('./defaultPlugins/schema');

const logger = require('./defaultModules/logger');
const fs = require('./defaultModules/fs');
const createComponentMeta = require('./defaultModules/createComponentMeta');

module.exports = () => {

  var config = {};

  creation(config);
  generation(config);
  directories(config);
  data(config);
  markup(config);
  style(config);
  script(config);
  schema(config);
  logger(config);
  fs(config);
  createComponentMeta(config);

  return config;
} 
