const _ = require('lodash');
const common = require('./common.js');

const add = function(componentMeta, config) {
    
    config.fs.mkdir(componentMeta.rootDirectory);

    _.each(componentMeta.subDirectories, function (type, key)
    {
        var path = common.directory(componentMeta, type);
        config.fs.mkdir(path);
    });
}

const rename = function(componentMetaOld, componentMetaNew, config) {

    config.fs.renameDir(componentMetaOld.rootDirectory, componentMetaNew.rootDirectory);

    //rename in old settings as root directory has been changed and further process needs to find root
    componentMetaOld.rootDirectory = componentMetaNew.rootDirectory;
}

module.exports = { add, rename };