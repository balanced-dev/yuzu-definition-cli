#!/usr/bin/env node
const program = require('commander');
const project = require('./creation/creators/project.js');
const create = require('./creation');
const generate = require('./generation/index.js');
const config = require('./config/configFactory.js').create();
 
var isDebugging = typeof v8debug === 'object'

const validateType = function(type) {
    if(!config.creation.blockPaths[type]) {
        console.error("Component type not recongnized should be block or page");
        return false;
    }
    return true;
};

program 
    .version('1.0.0')
    .description('Yuzu Definition CLI');

program
    .command('config <type>')
    .description('Shows the current applied settings')
    .action((type) => {
        if(validateType(type)) {
            create.settings(config);
        }
    });

program
    .command('add <type> <name> [area]')
    .alias('a')
    .description('Add a new block or page')
    .action((type, name, area = '') => {
        if(validateType(type)) {
            create.addBlock(config, type, area, name, config.creation.createComponentMeta);
        }
    });

program
    .command('addState <type> <name> <state> [area]')
    .alias('as')
    .description('Add new data state for an existing block or page')
    .action((type, name, state, area = '') => {
        if(validateType(type)) {
            create.addState(config, type, area, name, state);
        }
    });

program
    .command('rename <type> <oldName> <newName> [area]')
    .alias('r')
    .description('Rename a block')
    .action((type, oldName, newName, area = '') => {
        if(validateType(type)) {
            create.renameBlock(config, type, area, oldName, newName);
        }
    });

program
    .command('create <name>')
    .alias('c')
    .addArgument(new program.Argument('[structure]', 'Structure repository').default('balanced-dev/yuzu-definition-quickstart'))
    .addArgument(new program.Argument('[styles]', 'Styles repository').default('crissdev/bootstrap-scss'))
    .description('Generate the definition side of a project with basic configuration from a github repo')
    .action((name, structure, styles) => {
        project.initProjectRepo(name, structure, styles);
    });

    program
    .command('createLocal <name> <source>')
    .description('Generate the definition side of a project with basic configuration from a local directory')
    .action((name, source) => {
        project.initProjectDir(name, source);
    });


program
    .command('import')
    .alias('i')
    .description('Scaffold a project from schema shorthand, stored in Trello cards or .txt files')
    .action(() => {
        generate.run(config);
    });          


program.parse(process.argv);