const camelCase = require('change-case').camelCase;
const kebabCase = require('change-case').paramCase;
const path = require('path');

const getRoot = function(config, type, area, componentDir){

    var pathForType = config.creation.blockPaths[type].path;
    var isRoot = config.fs.isAtRoot;
    
    if(!config.directories.settings.createForComponent) {
        componentDir = '';
    }

    if(isRoot)
        return path.join(config.fs.cwd, pathForType, area, componentDir);
    else
        return path.join(config.fs.cwd, componentDir);
}

const createComponentMeta = function(config, type, area, name, state, contentIntercepts)
{
    return {
        type: type,
        fileName: camelCase(name),
        state: kebabCase(state),
        className: kebabCase(name),
        rootDirectory: getRoot(config, type, area, name),
        contentIntercepts: contentIntercepts,
        markup: '',
    };
}

module.exports = (config) => {

    config.creation.createComponentMeta = createComponentMeta;

};