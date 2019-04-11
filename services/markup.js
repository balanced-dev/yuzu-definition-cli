var fs = require('fs');
var common = require('./common.js');

var extension = ".hbs";

const filename = function(settings) {

    return `${settings.rootDirectory}/${settings.fileName}${extension}`;
}

const initialContent = function(settings) {

    return `<div class="${settings.className}{{#if modifier}} {{modifier}}{{/if}}">\n\n</div>`;
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