var path = require('path');
var common = require('./common.js');
var directories = require('./directories.js');

var extension = ".json";

const filename = function(settings, state) {

    if(state) {
        return path.join(directories.getSubPath(settings, 'data'), `${common.prefixName(settings)}_${state}${extension}`);
    }
    else {
        return path.join(directories.getSubPath(settings, 'data'), `${common.prefixName(settings)}${extension}`);
    }
}

const initialContent = function(settings){

    var data = {};

    if(settings.contentIntercepts.data)
        data = settings.contentIntercepts.data(data, settings); 

    settings.data = data;
    
    return JSON.stringify(data, null, 4);
}

const initialContentState = function(settings){

    return get(settings);
}

const get = function(settings, fs)
{
    return common.get(filename, settings, fs);
}

const add = function(settings, fs) {

    common.add(filename, initialContent, settings, fs);
}

const addState = function(state, settings, fs)
{
    var filenameState = (settings) => {
        return filename(settings, state)
    }

    common.add(filenameState, initialContentState, settings, fs);
}

const rename = function(oldSettings, newSettings, fs) {

    common.rename(undefined, filename, oldSettings, newSettings, fs);

    changeOtherDataFiles(oldSettings, newSettings, fs);
}

module.exports = { get, add, addState, rename };




const changeOtherDataFiles = function(oldSettings, newSettings, fs) {

    var dataPath = directories.getSubPath(oldSettings, 'data');
    var original = filename(oldSettings).replace(extension, '');
    var latest = filename(newSettings).replace(extension, '');

    var files = fs.readDir(dataPath);

    files.forEach(file => {
        
        var current = path.join(dataPath, file);
        if(latest != current.replace(extension, ''))
        {
            var change = current.replace(original, latest);
            fs.rename(current, change);
        }

    });
}