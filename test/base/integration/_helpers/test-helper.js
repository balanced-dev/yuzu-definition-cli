const generator = require('../../../../generation/index');
const addBlockPage = require('../../../../generation/addBlockPage');
const localFileSource = require('../../../../generation/plugins/cardSources/localFiles');
const fsStub = require('./fsStub');
const path = require('path');

let addedFiles = {};

module.exports = (ext, writeExpected) => {

    const resultOutput = require('./readWriteResults')(ext);
    let config = {};

    return {
        get config() {
            return config;
        },
        get addedFiles() {
            return addedFiles;
        },
        beforeEach: () => {   
            expected = '';
        },
        afterEach: (test) => {
            if (test.state === 'failed') 
                if(addedFiles && addedFiles[`${test.title}.${ext}`]) {
                    resultOutput.writeActual(test.title, addedFiles[`${test.title}.${ext}`]);
                }
            else    
                resultOutput.deleteActual(test.title);
        },
        setupResultsOutput: (dirs) => {
            resultOutput.setupOutputDir(dirs);
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
        
            config = require('../../../../config/configFactory').createForTesting(userConfig);
        },
        shouldHaveComponentName: (name) => {
            Object.keys(addedFiles).includes(name).should.equal(true);
        },
        actualEqualsExpected: (test) => {

            let actual = addedFiles[`${test.title}.${ext}`];
            if(test && !writeExpected)  {
                let expected = resultOutput.readExpected(test.title);
                actual.should.equal(expected);
            }
            else if (test) {
                resultOutput.writeExpected(test.title, actual);
            }

        },
        load_list: (list) => {
        
            addedFiles = {};
            generator.runSingleList(list, config, addBlockPage, fsStub(addedFiles));

        }
    }

    

}