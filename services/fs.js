var fs = require('fs');

module.exports = {

    dirExists: function(dir) {
        fs.existsSync(dir);
    },
    readDir: function(path) {
        return fs.readdirSync(path);
    },
    mkdir: function(dir) {
        fs.mkdir(settings.rootDirectory)
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
    }
 };