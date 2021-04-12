module.exports = (config) => {

  config.blockPaths.page.path = '/_dev/_templates/pages';
  config.blockPaths.block.path = '/_dev/_templates/blocks';
  config.blockPaths.layout.path = '/_dev/_templates/_layouts';

  config.prefixes.block.file = 'par';

  config.creators.splice(0, 0, { name: 'directories', module: require('../../../creation/creators/directories') });
  config.creators.splice(1, 0, { name: 'data', module: require('../../../creation/creators/data') });

};