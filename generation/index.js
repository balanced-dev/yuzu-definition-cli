const fs = require('../creation/services/fs');
const cardToComponent = require('./cardToComponent').run;
const inquirer = require('inquirer');

const runSingleList = (list, config, cardToComponent, fs) => {

    config.source.buildList(list, config, cardToComponent, fs);

}

const run = async function(config, isDebugging) {

    if(config.source) {
        let options = await config.source.getLists(config);
        if(options) {

            if(isDebugging) {
                runSingleList(options[0], config, cardToComponent, fs);
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
                    runSingleList(answer.list, config, cardToComponent, fs);
                });
            }

        }
    }
    else {
        console.error('Generation source option in config not defined/found.');
    }
};

module.exports = {run, runSingleList};