var path = require('path');
var common = require('./common.js');
var jsonSchemaGenerator = require('json-schema-generator');

var extension = ".schema";

const filename = function(settings) {

    return path.join(settings.rootDirectory, `${common.prefixName(settings)}${extension}`);
}

const initialContent = function(settings) {

    var schemaBody = jsonSchemaGenerator(settings.data);
    schemaBody.required = undefined;

    var schemaHeader = {};
    schemaHeader.id = `/${common.prefixName(settings)}`;

    var schema = Object.assign({}, schemaHeader, schemaBody);
    schema.additionalProperties = false;

    if(settings.contentIntercepts.schema)
        schema = settings.contentIntercepts.schema(schema, settings); 

    return JSON.stringify(schema, null, 4);
}

const changeContent = function(content, oldSettings, newSettings) {

    return content.replace(common.prefixName(oldSettings), common.prefixName(newSettings));
}

const get = function(settings)
{
    return common.get(filename, settings);
}

const add = function(settings) {

    common.add(filename, initialContent, settings);
}

const rename = function(oldSettings, newSettings) {

    common.rename(changeContent, filename, oldSettings, newSettings);
}

module.exports = { get, add, rename };