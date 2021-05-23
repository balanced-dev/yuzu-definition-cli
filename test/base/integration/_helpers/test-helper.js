const generator = require('../../../../generation/index');
const cardToComponent = require('../../../../generation/cardToComponent').run;
const localFileSource = require('../../../../modules/cardSources/localFiles/localFiles');
const fsStub = require('./fsStub');
const path = require('path');

const fs = fsStub();

module.exports = (ext, writeExpected) => {

    const resultOutput = require('./readWriteResults')(ext);
    let config = {};

    return {
        get config() {
            return config;
        },
        get addedFiles() {
            return fs.addedFiles;
        },
        beforeEach: () => {   
            expected = '';
        },
        afterEach: (test) => {
            if (test.state === 'failed') 
                if(fs.addedFiles && fs.addedFiles[`${test.title}.${ext}`]) {
                    resultOutput.writeActual(test.title, fs.addedFiles[`${test.title}.${ext}`]);
                }
            else    
                resultOutput.deleteActual(test.title);
        },
        setupResultsOutput: (dirs) => {
            resultOutput.setupOutputDir(dirs);
        },
        buildConfig: (context, sourceDirs) => {

            const userConfig = 
            {
                modules: context.modules,
                source: {
                    name: 'localFiles',
                    settings: {
                        directoryPath: path.resolve(...sourceDirs)
                    }
                }
            }
        
            config = require('../../../../config/configFactory').createForTesting(userConfig);

            config.fs = fs;

            if(context.tweakConfig) {
                context.tweakConfig(config);
            }
        },
        actualEqualsExpected: (test) => {

            let actual = fs.addedFiles[`${test.title}.${ext}`];
            if(test && !writeExpected)  {
                let expected = resultOutput.readExpected(test.title);
                actual.should.equal(expected);
            }
            else if (test) {
                resultOutput.writeExpected(test.title, actual);
            }

        },
        load_list: (list) => {
        
            fs.addedFiles = {};
            generator.runSingleList(list, config, cardToComponent);

        }
    }

    

}