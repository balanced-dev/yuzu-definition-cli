module.exports = () => {

    let cwd = '';
    let addedFiles = {};
    let addedDir = '';
    let dirExist = false;
    let fileExist = false;

    return {
        get cwd() {
            return cwd;
        },
        set cwd(value) {
            cwd = value;
        },
        get isAtRoot() {
            return true;
        },
        get addedFiles() {
            return addedFiles;
        },
        set addedFiles(files) {
            addedFiles = files;
        },
        get addedDir() {
            return addedDir;
        },
        set doesFileExist(exists) {
            fileExist = exists;
        },
        set doesDirExist(exists) {
            dirExist = exists;
        },
        dirExists: function(filename) { return dirExist; },
        mkdir: function(dir) { addedDir = dir; },
        fileExists: function(filename) { return fileExist; }, 
        readFile: function(filename) { },
        writeFile: function(filename, contents) {
            addedFiles[filename] = contents;
        }
    };
};