var path = require('path');
var common = require('./common.js');

const filename = function(settings) {
    return path.join(settings.rootDirectory, `_${common.prefixName(settings)}${settings.config.style.settings.fileExtension}`);    
}

const initialContent = function(settings) {
    let style = settings.config.style.settings.initialStyle(settings);

    if(settings.contentIntercepts.style)
        style = settings.contentIntercepts.style(style, settings); 

    return style;
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