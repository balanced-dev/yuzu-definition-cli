module.exports = (config) => {

  config.creation.blockPaths.page.path = '/_dev/_templates/pages';
  config.creation.blockPaths.block.path = '/_dev/_templates/blocks';
  config.creation.blockPaths.layout.path = '/_dev/_templates/_layouts';

  config.markup.settings.filePrefix.block = 'par';
  config.style.settings.filePrefix = '_';

  config.creators.splice(0, 0, { name: 'directories', module: require('../../../creation/creators/directories') });
  config.creators.splice(1, 0, { name: 'data', module: require('../../../creation/creators/data') });
  config.creators.push({ name: 'schema', module: require('../../../creation/creators/schema') });

};