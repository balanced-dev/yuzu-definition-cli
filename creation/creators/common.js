const initialContent = function(settings, type) {
    let content = settings.config[type].settings.initialContent(settings);

    settings.contentIntercepts[type].forEach(i => {
        content = i(content, settings); 
    });

    return content;
}

const get = function(filename, settings, fs) {
    
    var fileName = filename(settings);

    return fs.readFile(fileName);

}

const add = function(filename, initialContent, settings, fs) {
    
    var fileName = filename(settings);
    var contents = initialContent(settings);

    fs.writeFile(fileName, contents);

}

const rename = function(changeContent, filename, oldSettings, newSettings, fs) {

    var oldFileName = filename(oldSettings);

    if(fs.fileExists(oldFileName))
    {
        if(changeContent) {
            var contents = fs.readFile(oldFileName);
            contents = changeContent(contents, oldSettings, newSettings);
            fs.writeFile(oldFileName, contents);
        }
    
        var newFilename = filename(newSettings);
        fs.renameFile(oldFileName, newFilename);
    }
    else
    {
        console.warn(`Rename failed for ${oldFileName}, it didn't exist`);
    }


}

module.exports = { initialContent, get, add, rename };