var path = require('path');
var common = require('./common.js');

var extension = ".hbs";

const filename = function(settings) {

    return path.join(settings.rootDirectory, `${common.prefixName(settings)}${extension}`);
}

const initialContent = function(settings) {

    var html = `<div class="${settings.className}{{#if modifier}} {{modifier}}{{/if}}">\n\n</div>`;

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