const fs = require('fs');
const path = require('path');

const fsFacade = {
    dirExists: function(dir) {
        return fs.existsSync(dir);
    },
    readDir: function(path) {
        return fs.readdirSync(path);
    },
    mkdir: function(dir) {
        fs.mkdirSync(dir)
    },
    renameDir: function(oldDir, newDir) {
        fs.renameSync(oldDir, newDir)
    },

    fileExists: function(filename) {
        return fs.existsSync(filename);
    },
    readFile: function(filename) {
        return fs.readFileSync(filename, 'utf8')
    },
    writeFile: function(filename, contents) {
        fs.writeFileSync(filename, contents);
    },
    renameFile: function(oldFilename, newFilename) {
        fs.renameSync(oldFilename, newFilename)
    },
    getRoot: function(config, type, area = '', name){

        var pathForType = config.creation.blockPaths[type];
        var isRoot = config.fs.fileExists(path.join(process.cwd(), './package.json'));
        
        if(isRoot)
            return path.join(process.cwd(), pathForType, area, name);
        else
            return path.join(process.cwd(), name);
    }
 };

module.exports = (config) => {

    config.fs = fsFacade;

};