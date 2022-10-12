const fs = require('fs');
var ncp = require('ncp').ncp;

const changeCase = require('change-case');
const downloadRepo = require('download-git-repo');
const ansiColors = require('ansi-colors');

const projectRootPath = './definition.src';
const projectStylePath = projectRootPath + '/_dev/_source/styles/scss/bootstrap';
const projectNamePlaceholder = '{ProjectName}';

const projectRenameFiles = [
    {
        path: projectRootPath + '/package.json',
        caseFunction: changeCase.paramCase
    },
    {
        path: projectRootPath + '/dist.ps1',
        caseFunction: changeCase.pascalCase,
        caseOptions: { transform: changeCase.pascalCaseTransformMerge }
    },
    {
        path: projectRootPath + '/_dev/templates.html'
    }
];

const readWriteSync = function(filePath, oldValue, newValue) {
    let fileContents = fs.readFileSync(filePath, 'utf-8');  
    fileContents = fileContents.split(oldValue).join(newValue);
    fs.writeFileSync(filePath, fileContents, 'utf-8');
};

const initProjectRepo = function(name, structure, styles) {
    console.log(`Building project "${name}" from the "${structure}" repository...`);

    downloadRepo(structure, projectRootPath, function (error) {
        if(error) {            
            console.error(ansiColors.bold(ansiColors.bgRed(' ERROR ') + ' ' + ansiColors.red(`Unable to get quickstart structure from "${structure}"`)));
            console.error(error);
        }
        else {
            nameProject(name);
            getQuickStartStyles(styles);
            console.log(`Finished setting up "${name}" at "${process.cwd()}"`)
        }         
    });
};

const initProjectDir = function(name, source) {
    console.log(`Building project "${name}" from the "${source}" directory...`);

    ncp(source, projectRootPath, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log(`Finishing copying from source "${source}"`);
    });
};

const nameProject = function(name) {
    projectRenameFiles.forEach(file => {
        let casedName = name,
            caseOptions = file.caseOptions ? file.caseOptions : {};
        if(file.caseFunction) {
            casedName = file.caseFunction(casedName, caseOptions);
        }
        readWriteSync(file.path, projectNamePlaceholder, casedName);
    });
};

const getQuickStartStyles = function(styles) {
    console.log(`Getting styles from the "${styles}" repository...`);

    downloadRepo(styles, projectStylePath, function (error) {
        if(error) {
            console.error(`Unable to get quickstart styles from "${styles}"`);
        }         
    });
};

module.exports = { initProjectRepo, initProjectDir };