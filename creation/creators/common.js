const path = require('path');

const getFilePath = function(componentMeta, config, type) {

    const extension = config[type].settings.fileExtension;
    const filename =  config.creation.filenamePrefix(type, componentMeta, config);
    var pathName = path.join(getFileDirectory(componentMeta, type, config), `${filename}${extension}`);
    return pathName;
}

const getFileDirectory = function(componentMeta, type, config){
    
    if(config[type].settings.subdirectory) 
        return path.join(componentMeta.rootDirectory, config[type].settings.subdirectory);
    else
        return componentMeta.rootDirectory;
};

const initialContent = function(type, componentMeta, config) {
    let content = config[type].settings.initialContent(componentMeta);

    if(componentMeta.contentIntercepts[type]) {
        componentMeta.contentIntercepts[type].forEach(i => {
            content = i(content, componentMeta); 
        });
    }

    return content;
}

const get = function(filename, componentMeta, config) {
    
    var fileName = filename(componentMeta);

    return config.fs.readFile(fileName);

}

const add = function(filename, initialContent, componentMeta, config) {
    
    var fileName = filename(componentMeta, config);

    if (config.fs.fileExists(fileName) && !config.directories.settings.createForComponent)
    {
        console.warn(`This component file already exists at ${fileName}`);
    }
    else 
    {
        var contents = initialContent(componentMeta, config);
        config.fs.writeFile(fileName, contents);
    }

}

const rename = function(changeContent, filename, componentMetaOld, componentMetaNew, config) {

    var oldFileName = filename(componentMetaOld);

    if(config.fs.fileExists(oldFileName))
    {
        if(changeContent) {
            var contents = config.fs.readFile(oldFileName);
            contents = changeContent(contents, componentMetaOld, componentMetaNew);
            config.fs.writeFile(oldFileName, contents);
        }
    
        var newFilename = filename(componentMetaNew);
        config.fs.renameFile(oldFileName, newFilename);
    }
    else
    {
        console.warn(`Rename failed for ${oldFileName}, it didn't exist`);
    }


}

module.exports = { getFilePath, getFileDirectory, initialContent, get, add, rename };