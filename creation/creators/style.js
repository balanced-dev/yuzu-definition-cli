var path = require('path');
var common = require('./common.js');

const filename = function(settings) {
    const prefix = settings.config.style.settings.filePrefix;
    return path.join(settings.rootDirectory, `${common.prefixName(settings, prefix)}${settings.config.style.settings.fileExtension}`);    
}

const initialContent = function(settings) {

    return common.initialContent(settings, 'style');
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