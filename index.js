const program = require('commander');
const project = require('./creation/creators/project.js');
const create = require('./creation');
const generate = require('./generation/index.js');
const config = require('./config/configFactory.js').create();
 
var isDebugging = typeof v8debug === 'object'

const getType = function(type) {

    var ouput = config.creation.blockPaths[type];
    if(!ouput) {
        console.error("Component type not recongnized should be block or page");
    }
    return ouput;
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
            create.settings(typeSettings);
        }
    });

program
    .command('add <type> <name> [area]')
    .alias('a')
    .description('Add a new block or page')
    .action((type, name, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            create.addBlock(type, name, area, typeSettings, {});
        }
    });

program
    .command('addState <type> <name> <state> [area]')
    .alias('as')
    .description('Add new data state for an existing block or page')
    .action((type, name, state, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            create.addState(type, name, area, state, typeSettings);
        }
    });

program
    .command('rename <type> <oldName> <newName> [area]')
    .alias('r')
    .description('Rename a block')
    .action((type, oldName, newName, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            create.renameBlock(type, oldName, newName, area, typeSettings);
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