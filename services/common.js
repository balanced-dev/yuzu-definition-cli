var fs = require('fs');

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

const get = function(filename, settings) {
    
    var fileName = filename(settings);

    return fs.readFileSync(fileName, 'utf8');

}

const add = function(filename, initialContent, settings) {
    
    var fileName = filename(settings);
    var contents = initialContent(settings);

    fs.writeFileSync(fileName, contents);

}

const rename = function(changeContent, filename, oldSettings, newSettings) {

    var oldFileName = filename(oldSettings);

    if(fs.existsSync(oldFileName))
    {
        if(changeContent) {
            var contents = fs.readFileSync(oldFileName, "utf8");
            contents = changeContent(contents, oldSettings, newSettings);
            fs.writeFileSync(oldFileName, contents);
        }
    
        var newFilename = filename(newSettings);
        fs.renameSync(oldFileName, newFilename);
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