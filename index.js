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
            create.addBlock(config, type, area, name);
        }
    });

program
    .command('addState <type> <name> <state> [area]')
    .alias('as')
    .description('Add new data state for an existing block or page')
    .action((type, name, state, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            create.addState(config, type, area, name, state);
        }
    });

program
    .command('rename <type> <oldName> <newName> [area]')
    .alias('r')
    .description('Rename a block')
    .action((type, oldName, newName, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            create.renameBlock(config, type, area, oldName, newName);
        }
    });

program
    .command('create <name>')
    .alias('c')
    .description('Generate the definition side of a project with basic configuration')
    .action((name) => {
        project.initProject(name);
    });

program
    .command('import')
    .alias('i')
    .description('Scaffold a project from schema shorthand, stored in Trello cards or .txt files')
    .action(() => {
        generate.run(config, true);
    });          


program.parse(process.argv);