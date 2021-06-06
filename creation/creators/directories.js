const _ = require('lodash');
const common = require('./common.js');

const add = function(componentMeta, config) {
    
    if(config.directories.settings.createForComponent) {

        config.fs.mkdir(componentMeta.rootDirectory);


        _.each(config.createThese, function (type, key)
        {
            var path = common.getFileDirectory(componentMeta, type, config);
            if(path != componentMeta.rootDirectory) {
                config.fs.mkdir(path);
            }
        });

        console.log(`Added component directory ${componentMeta.type} "${componentMeta.rootDirectory}"`);
    }
    
}

const rename = function(componentMetaOld, componentMetaNew, config) {

    config.fs.renameDir(componentMetaOld.rootDirectory, componentMetaNew.rootDirectory);

    //rename in old settings as root directory has been changed and further process needs to find root
    componentMetaOld.rootDirectory = componentMetaNew.rootDirectory;
}

module.exports = { add, rename };