const fs = require('fs');
const path = require('path');

const fileExists = function(filename) {
    return fs.existsSync(filename);
};

const fsFacade = {
    get cwd() {
        return process.cwd();
    },
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
    fileExists: fileExists,
    readFile: function(filename) {
        return fs.readFileSync(filename, 'utf8')
    },
    writeFile: function(filename, contents) {
        fs.writeFileSync(filename, contents);
    },
    renameFile: function(oldFilename, newFilename) {
        fs.renameSync(oldFilename, newFilename)
    },
    isAtRoot: function() {
        fileExists(path.join(process.cwd(), './package.json'))
    }
 };

module.exports = (config) => {

    config.fs = fsFacade;

};