var fs = require('fs');
var common = require('./common.js');
var directories = require('./directories.js');

var extension = ".json";

const filename = function(settings) {

    return `${directories.getSubPath(settings, 'data')}${settings.fileName}${extension}`;
}

const initialContent = function(settings){

    return JSON.stringify(settings.data, null, 4);
}

const add = function(settings) {

    common.add(filename, initialContent, settings);
}

const rename = function(oldSettings, newSettings) {

    common.rename(undefined, filename, oldSettings, newSettings);
}

module.exports = { add, rename };