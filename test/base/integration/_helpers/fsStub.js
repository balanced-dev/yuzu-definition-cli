let addedFiles = {};

module.exports = () => {
    return {
        get addedFiles() {
            return addedFiles;
        },
        set addedFiles(files) {
            addedFiles = files;
        },
        dirExists: function(filename) { return false; },
        mkdir: function() { },
        readFile: function(filename) { },
        writeFile: function(filename, contents) {
            addedFiles[filename] = contents;
        },
        getRoot: function() { return ''; }
    };
};