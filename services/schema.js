var path = require('path');
var common = require('./common.js');
var jsonSchemaGenerator = require('json-schema-generator');

var extension = ".schema";

const filename = function(settings) {

    return path.join(settings.rootDirectory, `${settings.fileName}${extension}`);
    return `${settings.rootDirectory}/${settings.fileName}${extension}`;
}

const initialContent = function(settings) {

    var schemaBody = jsonSchemaGenerator(settings.data);
    schemaBody.required = undefined;

    var schemaHeader = {};
    schemaHeader.id = `/${settings.fileName}`;

    var schema = Object.assign({}, schemaHeader, schemaBody);
    schema.additionalProperties = false;

    return JSON.stringify(schema, null, 4);;
}

const changeContent = function(content, oldSettings, newSettings) {

    return content.replace(oldSettings.fileName, newSettings.fileName);
}

const add = function(settings) {

    common.add(filename, initialContent, settings);
}

const rename = function(oldSettings, newSettings) {

    common.rename(changeContent, filename, oldSettings, newSettings);
}

module.exports = { add, rename };