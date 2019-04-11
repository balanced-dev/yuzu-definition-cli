var fs = require('fs');

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

module.exports = { add, rename };