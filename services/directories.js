var fs = require('fs');
var path = require('path');
const _ = require('lodash');

const getSubPath = function(settings, subDirectory){
    
    return path.join(settings.rootDirectory, settings.subDirectories[subDirectory]);
};

const add = function(settings) {
    
    fs.mkdirSync(settings.rootDirectory);

    _.each(settings.subDirectories, function (value, key)
    {
        var path = getSubPath(settings, value);
        fs.mkdirSync(path);
    });
}

const rename = function(oldSettings, newSettings) {

    fs.renameSync(oldSettings.rootDirectory, newSettings.rootDirectory);

    //rename in old settings as root directory has been changed and further process needs to find root
    oldSettings.rootDirectory = newSettings.rootDirectory;
}

module.exports = { add, rename, getSubPath };