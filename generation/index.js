const fs = require('../creation/services/fs');
const addBlockPage = require('./addBlockPage');
const inquirer = require('inquirer');

const runSingleList = (list, config, addBlockPage, fs) => {

    config.propertyTypes = require('../config/propertyTypes');

    let generator = config.cardSources[config.cardSource];

    generator.buildList(list, config, addBlockPage, fs);

}

const run = async function(config, isDebugging) {
    const source = config.cardSources[config.cardSource];

    if(source) {
        let options = await source.getLists(config);
        if(options) {

            if(isDebugging) {
                runSingleList(options[0], config, addBlockPage, fs);
            }
            else {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'list',
                        message: 'Which list do you want to build?',
                        choices: options
                    }
                ])
                .then(answer => {
                    runSingleList(answer.list, config, addBlockPage, fs);
                });
            }

        }
    }
    else {
        console.error('Generation source option in config not defined/found. Options are: ' + Object.keys(blockGenerators).join(', '));
    }
};

module.exports = {run, runSingleList};