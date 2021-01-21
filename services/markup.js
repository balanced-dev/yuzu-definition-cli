var path = require('path');
var common = require('./common.js');
var config = require('./importConfig/settings').settings.markupSettings;

const filename = function(settings) {

    return path.join(settings.rootDirectory, `${common.prefixName(settings)}${config.fileExtension}`);
}

const initialContent = function(settings) {

    var className = settings.className;
    var searchRegExp = new RegExp('\\$\\{yuzu.className\\}', 'g');
    var html = config.initalMarkup.replace(searchRegExp, className);

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