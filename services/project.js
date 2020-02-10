const fs = require('fs');
const changeCase = require('change-case');
const downloadRepo = require('download-git-repo');

const repositoryUrls = {
    structure: 'balanced-dev/yuzu-definition-quickstart',
    styles: 'crissdev/bootstrap-scss'
};
const projectRootPath = './definition.src';
const projectStylePath = projectRootPath + '/_dev/_source/styles/scss/bootstrap';
const projectNamePlaceholder = '{ProjectName}';

const projectRenameFiles = [
    {
        path: projectRootPath + '/package.json',
        caseFunction: changeCase.paramCase
    },
    {
        path: projectRootPath + '/gulpfile.js/config.js',
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

const initProject = function(name) {
    console.log(`Building project "${name}"...`);

    downloadRepo(repositoryUrls.structure, projectRootPath, function (error) {
        if(error) {
            console.error(`Unable to get quickstart structure from "${repositoryUrls.structure}"`);
            console.error(error);
        }
        else {
            nameProject(name);
            getQuickStartStyles();
        }         
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

const getQuickStartStyles = function() {
    console.log(`Getting styles...`);

    downloadRepo(repositoryUrls.styles, projectStylePath, function (error) {
        if(error) {
            console.error(`Unable to get quickstart styles from "${repositoryUrls.styles}"`);
        }         
    });
};

module.exports = { initProject };