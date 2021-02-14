const prefixName = function(settings)
{
    if(settings.addPrefix)
    {
        var filename = capitalize(settings.fileName);
        return `${settings.prefix}${filename}`;
    }
    else
    {
        return settings.fileName;
    }
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

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = { prefixName, get, add, rename };