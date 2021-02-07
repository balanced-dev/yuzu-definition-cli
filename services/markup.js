var path = require('path');
var common = require('./common.js');
var config = require('./config/config').run().markupSettings;

const filename = function(settings) {
    var pathName = path.join(settings.rootDirectory, `${common.prefixName(settings)}${config.fileExtension}`);
    return pathName;
}

const initialContent = function(settings) {
    var html = config.initalMarkup(settings);

    if(settings.contentIntercepts.markup)
        html = settings.contentIntercepts.markup(html, settings); 

    return html;
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