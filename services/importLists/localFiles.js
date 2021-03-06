const   fs = require('fs'),
        path = require('path'),
        settings = require('../importConfig/settings').run();
let localFilesDirectory;
try {
    localFilesDirectory = path.resolve(process.cwd(), settings.localFiles.directoryPath);
}
catch(err) {
    console.log(err);
}

const getLists = function() {
    if (fs.existsSync(localFilesDirectory)) {        
        let lists =  fs.readdirSync(localFilesDirectory);
        lists = lists.filter(item => fs.statSync(path.join(localFilesDirectory, item)).isDirectory());

        if(lists.length !== 0) {
            return lists;
        }
        else {
            console.error('No directories found in "'+localFilesDirectory+'"');
        }
    }
    else {
        console.error('The directory "'+localFilesDirectory+'" does not exist');
    }
}

module.exports = { getLists };