var path = require('path');
var common = require('./common.js');

const filename = function(settings) {
    const filename =  settings.config.creation.filenamePrefix('markup', settings);
    var pathName = path.join(settings.rootDirectory, `${filename}${settings.config.markup.settings.fileExtension}`);
    return pathName;
}

const initialContent = function(settings) {

    return common.initialContent(settings, 'markup');
}

const changeContent = function(content, oldSettings, newSettings) {

    return content.replace(oldSettings.className, newSettings.className);
}

const add = function(settings, fs) {

    common.add(filename, initialContent, settings, fs);
}

const rename = function(oldSettings, newSettings, fs) {
    
    common.rename(changeContent, filename, oldSettings, newSettings, fs);
}

module.exports = { add, rename, initialContent };