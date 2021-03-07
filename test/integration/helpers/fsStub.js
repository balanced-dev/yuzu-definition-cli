module.exports = (addedFiles) => {
    return {
        dirExists: function(filename) { return false; },
        mkdir: function() { },
        readFile: function(filename) { },
        writeFile: function(filename, contents) {
            addedFiles[filename] = contents;
        },
        getRoot: function() { return ''; }
    };
};