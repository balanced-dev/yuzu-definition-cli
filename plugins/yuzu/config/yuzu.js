const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = (config) => {

  config.creation.blockPaths.page.path = '/_dev/_templates/pages';
  config.creation.blockPaths.block.path = '/_dev/_templates/blocks';
  config.creation.blockPaths.layout.path = '/_dev/_templates/_layouts';
  config.creation.filenamePrefix = (generatorType, componentMeta, config) => {

    let prefix = config.markup.settings.filePrefix[componentMeta.type];
    if(generatorType == 'style') prefix = `_${prefix}`;

    if(prefix) {
        var filename = capitalize(componentMeta.fileName);
        return `${prefix}${filename}`;
    }
    else {
      return componentMeta.fileName;
    }

  }

  config.data.settings.subdirectory = 'data';

  config.markup.settings.filePrefix.block = 'par';
  config.style.settings.filePrefix = '_';

  config.creators.splice(0, 0, { name: 'directories', module: require('../../../creation/creators/directories') });

  config.createThese = ['directories', 'schema', 'data', 'markup', 'style']; 

};