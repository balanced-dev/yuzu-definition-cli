const path = require('path'),
      inquirer = require('inquirer')
      fs = require('fs'),
      config = require('./importConfig/settings'),
      configFile = undefined,
      generationConfig = config.settings;
      
const platform = process.platform;
const exec = require('child_process').execFile;
let executablePath = '../yuzu-definition-import/';
const executableFilePrefix = 'yuzudef-import-'

const blockGenerators = {
    localFiles: require('./importLists/localFiles'),
    trello: require('./importLists/trello'),    
};

const setConfigFile = function() {
    configFile = require(config.jsonPath);
};

const finishExecutablePath = function() {
    if(platform === 'win32') {
        executablePath += `win/${executableFilePrefix}win.exe`;
    }
    else if(platform === 'darwin') {
        executablePath += `macos/${executableFilePrefix}macos`;
    }
    else {
        console.error('Unsupported platform! Import command only supports MacOS and Windows');
        return;
    }
    executablePath = path.resolve(__dirname, executablePath);
};

const ensureYuzuKeyExists = function() {
    setConfigFile();
    let exists = false;
    if(!configFile.yuzuPro) {
        configFile.yuzuPro = {};
    }
    if(configFile.yuzuPro.key) {
        exists = true;
    }
    return exists;
};

const updateYuzuProKey = function(callback) {
    setConfigFile();
    inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message: 'Enter either a trial/full activation key from https://www.balanced.dev/'
        }
    ])
    .then(answer => {
        configFile.yuzuPro.key = answer.key;
        updateConfig();
        if(callback) {
            callback();
        }
    });
}

const updateConfig = function() {    
    const jsonString = JSON.stringify(configFile, null, 4);
    
    fs.writeFile(config.jsonPath, jsonString, err => {
        if (err) {
            console.log('Error updating config file', err)
        } else {
            console.log('Successfully updated Yuzu key in config file')
        }
    });
};

const getListOption = async function() {
    const generator = blockGenerators[generationConfig.generationSource];

    if(generator) {
        let options = await generator.getLists();
        if(options) {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'list',
                    message: 'Which list do you want to build?',
                    choices: options
                }
            ])
            .then(answer => {
                runExecutable(answer.list);
            });
        }
    }
    else {
        console.error('Generation source option in config not defined/found. Options are: ' + Object.keys(blockGenerators).join(', '));
    }
};

const runExecutable = function(list) {    
    exec(executablePath, [list, JSON.stringify(generationConfig)], (error, stdout, stderr) => {
        if(error) {
            throw error;
        }
        console.log(stdout);
    });
};

const run = async function() {
    setConfigFile();
    finishExecutablePath();
    if(ensureYuzuKeyExists()){
        getListOption();
    }
    else {
        updateYuzuProKey(getListOption);
    }
};

module.exports = {run, ensureYuzuKeyExists, updateYuzuProKey};