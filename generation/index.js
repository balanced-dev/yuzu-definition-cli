const fs = require('../creation/services/fs');
const addBlockPage = require('./addBlockPage');
const inquirer = require('inquirer');

const runSingleList = (list, config, addBlockPage, fs) => {

    config.source.buildList(list, config, addBlockPage, fs);

}

const run = async function(config, isDebugging) {

    if(config.source) {
        let options = await config.source.getLists(config);
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
        console.error('Generation source option in config not defined/found.');
    }
};

module.exports = {run, runSingleList};