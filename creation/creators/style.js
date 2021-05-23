var path = require('path');
var common = require('./common.js');

const getFilePath = function(componentMeta, config) {
    return common.getFilePath(componentMeta, config, 'style');
}

const initialContent = function(componentMeta, config) {

    return common.initialContent('style', componentMeta, config);
}

const changeContent = function(content, componentMetaOld, componentMetaNew) {

    return content.replace(componentMetaOld.className, componentMetaNew.className);
}

const add = function(componentMeta, config) {

    common.add(getFilePath, initialContent, componentMeta, config);
}

const rename = function(componentMetaOld, componentMetaNew, config) {

    common.rename(changeContent, getFilePath, componentMetaOld, componentMetaNew, config);
}

module.exports = { add, rename, initialContent };