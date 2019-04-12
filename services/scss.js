var path = require('path');
var common = require('./common.js');

var extension = ".scss";

const filename = function(settings) {

    return path.join(settings.rootDirectory, `_${common.prefixName(settings)}${extension}`);
}

const initialContent = function(settings) {

    return `.${settings.className} {\n\n}`;
}

const changeContent = function(content, oldSettings, newSettings) {

    return content.replace(oldSettings.className, newSettings.className);
}

const add = function(settings) {

    common.add(filename, initialContent, settings);
}

const rename = function(oldSettings, newSettings) {

    common.rename(changeContent, filename, oldSettings, newSettings);
}

module.exports = { add, rename };