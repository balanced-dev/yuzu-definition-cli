var camelCase = require('change-case').camelCase;
var kebabCase = require('change-case').paramCase;

const createComponentMeta = function(config, type, area, name, state, contentIntercepts)
{
    return {
        type: type,
        fileName: camelCase(name),
        state: kebabCase(state),
        className: kebabCase(name),
        rootDirectory: config.fs.getRoot(config, type, area, name),
        contentIntercepts: contentIntercepts,
        markup: ''
    };
}

module.exports = (config) => {

    config.creation.createComponentMeta = createComponentMeta;

};