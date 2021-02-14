const localImport = require('../../../yuzu-def-import/indexLocal');
const config = require('../../services/config/defaults/vue');
const testCardSource = require('./testCardSource');
const addBlockPage = require('../../../yuzu-def-import/services/blockGeneration/addBlockPage');

const addedFiles = [];

const fs = {
    dirExists: function(filename) {
        if(filename == 'c:\\Frontend Projects\\Yuzu\\yuzu-definition-cli\\_dev\\_templates\\blocks\\parTestBlock')
            return false;
    },
    mkdir: function() { },
    fileExists: function(filename) {
        if(filename.includes('package.json'))
            return true;
    },
    readFile: function(filename) {
    },
    writeFile: function(filename, contents) {
        addedFiles.push({
            name: filename,
            content: contents
        });
    },
};

describe('vue integration tests', function() {

	it('Creates simple, single property stylesheeet', function() {
        
        
        config.cardSource = 'test';
        config.cardSources.test = testCardSource;

        var list = [
            {
                type: 'block',
                card: {
                    name: 'parTestBlock',
                    schema: 'Schema:\ntitle'
                },

            }
        ]

        localImport(list, config, addBlockPage, fs);

    });

});