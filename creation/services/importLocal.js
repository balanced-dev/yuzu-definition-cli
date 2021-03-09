const fs = require('./fs'),
      config = require('../../config/config'),
      generationConfig = config.run();

const blockGenerators = generationConfig.cardSources;

const getListOption = async function() {
    const generator = blockGenerators[generationConfig.cardSource];

    if(generator) {
        let options = await generator.getLists();
        if(options) {

            const localImport = require('../../../yuzu-def-import/indexLocal');
            const addBlockPage = require('../../../yuzu-def-import/services/blockGeneration/addBlockPage');
            localImport(options[0], generationConfig, addBlockPage, fs)
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