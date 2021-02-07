const fs = require('fs'),
      config = require('./config/config'),
      configFile = undefined,
      generationConfig = config.run(),
      localImport = require('../../yuzu-def-import/indexLocal');

const blockGenerators = {
    localFiles: require('./importLists/localFiles'),
    trello: require('./importLists/trello'),    
};

const setConfigFile = function() {
    configFile = require(config.userConfigPath);
};

const getListOption = async function() {
    const generator = blockGenerators[generationConfig.generationSource];

    if(generator) {
        let options = await generator.getLists();
        if(options) {

            localImport(options[0], config.userConfigPath, generationConfig)
        }
    }
    else {
        console.error('Generation source option in config not defined/found. Options are: ' + Object.keys(blockGenerators).join(', '));
    }
};

const run = async function() {
    getListOption();
};

module.exports = {run};