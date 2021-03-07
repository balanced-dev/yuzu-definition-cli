const localImport = require('../../../../yuzu-def-import/indexLocal');
const addBlockPage = require('../../../../yuzu-def-import/services/blockGeneration/addBlockPage');
const localFileSource = require('../../../services/plugins/cardSources/localFiles');
const fsStub = require('./fsStub');
const should = require('should');
const path = require('path');

let addedFiles = {};

module.exports = (config, lang, ext, writeExpected) => {

    const resultOutput = require('./readWriteResults')(lang, ext);

    return {
        beforeEach: () => {   
            expected = '';
        },
        afterEach: (test) => {
            if (test.state === 'failed') 
                resultOutput.writeActual(test.title, addedFiles[test.title].content);
            else    
                resultOutput.deleteActual(test.title);
        },
        setupResultsOutput: (...args) => {
            resultOutput.setupOutputDir(...args);
        },
        setupLocalFileSource: (...args) => {

            config.prefixes.block.file = '';

            config.cardSource = 'test';
            config.cardSources.test = localFileSource;
            config.localFiles.directoryPath = path.resolve(...args);

            return config.cardSources.test;

        },
        shouldHaveNoOfFiles: (no) => {
            Object.keys(addedFiles).length.should.equal(no);
        },
        shouldHaveComponentName: (name) => {
            Object.keys(addedFiles).includes(name);
        },
        actualEqualsExpected: (test) => {

            let actual = addedFiles[`${test.title}.${ext}`];
            if(test && !writeExpected)  {
                let expected = resultOutput.readExpected(test.title);
                actual.should.equal(expected);
            }
            else if (test) {
                output.writeExpected(test.title, actual);
            }

        },
        load_list: (list) => {
        
            addedFiles = {};
            localImport(list, config, addBlockPage, fsStub(addedFiles));

        }
    }

    

}