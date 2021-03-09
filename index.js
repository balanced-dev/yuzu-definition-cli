const program = require('commander');
const project = require('./creation/creators/project.js');
const defImport = require('./creation/services/import.js');
const defImportLocal = require('./creation/services/importLocal.js');
const config = require('./config/config.js');
const configSettings = config.run();
const { settings, addBlock, addState, renameBlock } = require('./logic');

const getType = function(type) {

    var ouput = configSettings.blockPaths[type];
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
            addBlock(type, name, area, typeSettings, {});
        }
    });

program
    .command('addState <type> <name> <state> [area]')
    .alias('as')
    .description('Add new data state for an existing block or page')
    .action((type, name, state, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            addState(type, name, area, state, typeSettings);
        }
    });

program
    .command('rename <type> <oldName> <newName> [area]')
    .alias('r')
    .description('Rename a block')
    .action((type, oldName, newName, area = '') => {
        var typeSettings = getType(type);
        if(typeSettings) {
            renameBlock(type, oldName, newName, area, typeSettings);
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
    .description('Scaffold a project from schema shortand, stored in Trello cards or .txt files')
    .action(() => {
        defImport.run();
    });

program
    .command('import-local')
    .alias('i')
    .description('Scaffold a project from schema shortand, stored in Trello cards or .txt files')
    .action(() => {
        defImportLocal.run();
    });    

program
    .command('updateKey')
    .description('Update your YuzuPro key in your project config file to allow use of Yuzu Definition Import')
    .action(() => {
        defImport.ensureYuzuKeyExists();
        defImport.updateYuzuProKey();
    });

program.parse(process.argv);

module.exports = { getType, addBlock, config };