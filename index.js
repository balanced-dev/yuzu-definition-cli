const program = require('commander');
const { addBlock, renameBlock } = require('./logic');

program 
    .version('1.0.0')
    .description('Yuzu Definition CLI');

program
    .command('addBlock <name>')
    .alias('ab')
    .description('Add a new block')
    .action((name) => {
        addBlock(name);
    });

program
    .command('renameBlock <oldName> <newName>')
    .alias('rb')
    .description('Add a new block')
    .action((oldName, newName) => {
        renameBlock(oldName, newName);
    });

program.parse(process.argv);