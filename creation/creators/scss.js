var path = require('path');
var common = require('./common.js');

var extension = ".scss";

const filename = function(settings) {

    return path.join(settings.rootDirectory, `_${common.prefixName(settings)}${extension}`);
}

const initialContent = function(settings) {
    var scss = settings.config.style.settings.initialStyle(settings);

    if(settings.contentIntercepts.scss)
        scss = settings.contentIntercepts.scss(scss, settings); 

    return scss;
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