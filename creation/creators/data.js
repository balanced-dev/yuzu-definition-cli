var path = require('path');
var common = require('./common.js');

const getFilePath = function(componentMeta, config, state) {

    const extension = config.data.settings.fileExtension;
    const filename =  config.creation.filenamePrefix('markup', componentMeta);
    if(state) {
        return path.join(common.getFileDirectory(componentMeta, 'data', config), `${filename}_${state}${extension}`);
    }
    else {
        return path.join(common.getFileDirectory(componentMeta, 'data', config), `${filename}${extension}`);
    }
}

const initialContent = function(componentMeta){

    var data = {};

    if(componentMeta.contentIntercepts.data)
        data = componentMeta.contentIntercepts.data(data, componentMeta); 


    componentMeta.data = data;
    
    return JSON.stringify(data, null, 4);
}

const initialContentState = function(componentMeta){

    return get(componentMeta);
}

const get = function(componentMeta, config)
{
    return common.get(getFilePath, componentMeta, config);
}

const add = function(componentMeta, config) {

    common.add(getFilePath, initialContent, componentMeta, config);
}

const addState = function(state, componentMeta, config)
{
    var filenameState = () => {
        return getFilePath(componentMeta, config, state)
    }

    common.add(filenameState, initialContentState, componentMeta, config);
}

const rename = function(componentMetaOld, componentMetaNew, config) {

    common.rename(undefined, getFilePath, componentMetaOld, componentMetaNew, config);

    changeOtherDataFiles(oldSettings, newSettings, config);
}

const changeOtherDataFiles = function(componentMetaOld, componentMetaNew, config) {

    var dataPath = common.getFileDirectory(componentMetaOld, 'data', config);
    var original = getFilePath(componentMetaOld).replace(extension, '');
    var latest = getFilePath(componentMetaNew).replace(extension, '');

    var files = config.fs.readDir(dataPath);

    files.forEach(file => {
        
        var current = path.join(dataPath, file);
        if(latest != current.replace(extension, ''))
        {
            var change = current.replace(original, latest);
            config.fs.rename(current, change);
        }

    });
}

module.exports = { get, add, addState, rename };