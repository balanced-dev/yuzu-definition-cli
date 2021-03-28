const generator = require('../../../generation/index');
const addBlockPage = require('../../../generation/addBlockPage');
const localFileSource = require('../../../generation/plugins/cardSources/localFiles');
const fsStub = require('./fsStub');
const should = require('should');
const path = require('path');

let addedFiles = {};

module.exports = (lang, ext, writeExpected) => {

    const resultOutput = require('./readWriteResults')(lang, ext);
    let config = {};

    return {
        get config() {
            return config;
        },
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
        buildConfig: (modules, sourceDirs) => {

            const userConfig = 
            {
                modules: modules,
                source: {
                    name: 'localFiles',
                    settings: {
                        directoryPath: path.resolve(...sourceDirs)
                    }
                }
            }
        
            config = require('../../../config/configFactory').createForTesting(userConfig);
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
            generator.runSingleList(list, config, addBlockPage, fsStub(addedFiles));

        }
    }

    

}