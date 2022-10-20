const fs = require('fs');
var ncp = require('ncp').ncp;

const changeCase = require('change-case');
const downloadRepo = require('download-git-repo');
const ansiColors = require('ansi-colors');

const projectRootPath = './definition.src';
const projectNamePlaceholder = '{ProjectName}';
const projectNameKebabPlaceholder = '{ProjectName:kebab}';

const filesWithPlaceholders = [
    projectRootPath + '/package.json', 
    projectRootPath + '/_dev/index.template.html'
];

const initProjectRepo = function(name, structure) {
    console.log(`Building project "${name}" from the "${structure}" repository...`);

    downloadRepo(structure, projectRootPath, function (error) {
        if(error) {            
            console.error(ansiColors.bold(ansiColors.bgRed(' ERROR ') + ' ' + ansiColors.red(`Unable to get quickstart structure from "${structure}"`)));
            console.error(error);
        }
        else {
            nameProject(name);
            console.log(`Finished setting up "${name}" at "${process.cwd()}"`)
        }
    });
};

const initProjectDir = function(name, source) {
    console.log(`Building project "${name}" from the "${source}" directory...`);

    let options = {
        filter: (path) => !/((\.git)|(node_modules)|(dist))$/.test(path)
    }

    ncp(source, projectRootPath, options, function (err) {
        if (err) {
          return console.error(err);
        }
        nameProject(name);
        console.log(`Finishing copying from source "${source}"`);
    });
};

const nameProject = function(projectName) {
    const kebabProjectName = changeCase.paramCase(projectName);

    filesWithPlaceholders.forEach(file => {
        let contents = fs.readFileSync(file, 'utf-8');
        contents = contents.replaceAll(projectNamePlaceholder, projectName);
        contents = contents.replaceAll(projectNameKebabPlaceholder, kebabProjectName);
        fs.writeFileSync(file, contents, 'utf-8');
    });
};

module.exports = { initProjectRepo, initProjectDir };