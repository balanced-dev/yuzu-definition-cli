#!/usr/bin/env node
const program = require('commander');
const { settings, addBlock, addState, renameBlock } = require('./logic');

const types = {
    page: { 
        prefix: false,
        path: '/_dev/_templates/src/blocks'
    },
    block: { 
        prefix: true,
        path: '/_dev/_templates/src/blocks'
    }
}

const getType = function(type) {

    var type = types[type];
    if(!type) {
        console.error("Component type not recongnized should be block or page");
    }
    return type;
};

program 
    .version('1.0.0')
    .description('Yuzu Definition CLI');

program
    .command('config <type>')
    .description('Shows the current applied settings')
    .action((type) => {
        var typeSettings = getType(type);
        if(typeSettings) {
            settings(typeSettings);
        }
    });

program
    .command('add <type> <name> [area]')
    .alias('a')
    .description('Add a new block or page')
    .action((type, name, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            addBlock(name, area, typeSettings);
        }
    });

program
    .command('addState <type> <name> <state> [area]')
    .alias('as')
    .description('Add new data state for an existing block or page')
    .action((type, name, state, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            addState(name, area, state, typeSettings);
        }
    });

program
    .command('rename <type> <oldName> <newName> [area]')
    .alias('r')
    .description('Rename a block')
    .action((type, oldName, newName, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            renameBlock(oldName, newName, area, typeSettings);
        }
    });

program.parse(process.argv);