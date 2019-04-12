var fs = require('fs');
var path = require('path');
var common = require('./common.js');
var directories = require('./directories.js');

var extension = ".json";

const filename = function(settings) {

    return path.join(directories.getSubPath(settings, 'data'), `${settings.fileName}${extension}`);
}

const initialContent = function(settings){

    return JSON.stringify(settings.data, null, 4);
}

const add = function(settings) {

    common.add(filename, initialContent, settings);
}

const rename = function(oldSettings, newSettings) {

    common.rename(undefined, filename, oldSettings, newSettings);

    changeOtherDataFiles(oldSettings, newSettings);
}

module.exports = { add, rename };




const changeOtherDataFiles = function(oldSettings, newSettings) {

    var dataPath = directories.getSubPath(oldSettings, 'data');
    var original = filename(oldSettings).replace(extension, '');
    var latest = filename(newSettings).replace(extension, '');

    var files = fs.readdirSync(dataPath);

    files.forEach(file => {
        
        var current = path.join(dataPath, file);
        if(latest != current.replace(extension, ''))
        {
            var change = current.replace(original, latest);
            fs.renameSync(current, change);
        }

    });
}