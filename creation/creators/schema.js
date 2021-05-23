var path = require('path');
var common = require('./common.js');
var jsonSchemaGenerator = require('json-schema-generator');

const getFilePath = function(componentMeta, config) {
    return common.getFilePath(componentMeta, config, 'schema');
}

const initialContent = function(componentMeta, config) {
    var data = componentMeta.contentIntercepts.dataForSchemaGeneration ? componentMeta.contentIntercepts.dataForSchemaGeneration : componentMeta.data;
    var schemaBody = jsonSchemaGenerator(data);
    schemaBody.required = undefined;

    var schemaHeader = {};
    const schemaName =  config.creation.filenamePrefix('schema', componentMeta);
    schemaHeader.id = `/${schemaName}`;

    var schema = Object.assign({}, schemaHeader, schemaBody);
    schema.additionalProperties = false;

    componentMeta.contentIntercepts.schema.forEach(i => {
        schema = i(schema, componentMeta); 
    });

    return JSON.stringify(schema, null, 4);
}

const changeContent = function(content, componentMetaOld, componentMetaNew) {

    return content.replace(common.prefixName(componentMetaOld), common.prefixName(componentMetaNew));
}

const get = function(componentMeta, config)
{
    return common.get(getFilePath, componentMeta, config);
}

const add = function(componentMeta, config) {

    common.add(getFilePath, initialContent, componentMeta, config);
}

const rename = function(componentMetaOld, componentMetaNew, config) {

    common.rename(changeContent, getFilePath, componentMetaOld, componentMetaNew, config);
}

module.exports = { get, add, rename, initialContent };