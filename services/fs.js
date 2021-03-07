const fs = require('fs');
const path = require('path');

module.exports = {

    dirExists: function(dir) {
        fs.existsSync(dir);
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
        fs.existsSync(filename);
    },
    readFile: function(filename) {
        fs.readFileSync(filename, 'utf8')
    },
    writeFile: function(filename, contents) {
        fs.writeFileSync(filename, contents);
    },
    renameFile: function(oldFilename, newFilename) {
        fs.renameSync(oldFilename, newFilename)
    },

    getRoot: function(name, area = '', typeSettings, fs){

        var isRoot = fs.fileExists(path.join(process.cwd(), './package.json'));
        
        if(isRoot)
            return path.join(process.cwd(), typeSettings.path, area, name);
        else
            return path.join(process.cwd(), name);
    }
 };