var path = require('path');
var common = require('./common.js');
var jsonSchemaGenerator = require('json-schema-generator');

var extension = ".schema";

const filename = function(settings) {
    const filename =  settings.config.creation.filenamePrefix('schema', settings);
    return path.join(settings.rootDirectory, `${filename}${extension}`);
}

const initialContent = function(settings) {
    var data = settings.contentIntercepts.dataForSchemaGeneration ? settings.contentIntercepts.dataForSchemaGeneration : settings.data;
    var schemaBody = jsonSchemaGenerator(data);
    schemaBody.required = undefined;

    var schemaHeader = {};
    const schemaName =  settings.config.creation.filenamePrefix('schema', settings);
    schemaHeader.id = `/${schemaName}`;

    var schema = Object.assign({}, schemaHeader, schemaBody);
    schema.additionalProperties = false;

    settings.contentIntercepts.schema.forEach(i => {
        schema = i(schema, settings); 
    });

    return JSON.stringify(schema, null, 4);
}

const changeContent = function(content, oldSettings, newSettings) {

    return content.replace(common.prefixName(oldSettings), common.prefixName(newSettings));
}

const get = function(settings, fs)
{
    return common.get(filename, settings, fs);
}

const add = function(settings, fs) {

    common.add(filename, initialContent, settings, fs);
}

const rename = function(oldSettings, newSettings, fs) {

    common.rename(changeContent, filename, oldSettings, newSettings, fs);
}

module.exports = { get, add, rename, initialContent };