var fs = require('fs');
var camelCase = require('camelcase');
var kebabCase = require('kebab-case');
var directories = require('./services/directories.js');
var markup = require('./services/markup.js');
var scss = require('./services/scss.js');
var dataProccess = require('./services/data.js');
var schemaProcess = require('./services/schema.js');

const getBlockSettings = function(name, area, typeSettings, data = {})
{
    return {
        prefix: 'par',
        addPrefix: typeSettings.prefix,
        fileName: camelCase(name),
        className: kebabCase(name),
        directoryName: camelCase(name),
        rootDirectory: directories.getRoot(name, area, typeSettings),
        subDirectories: {
            data: 'data'
        },
        get data() {
            return data;
        }
    };
}

const settings = function(typeSettings)
{
    var settings = getBlockSettings('', '', typeSettings);

    console.log(JSON.stringify(settings, null, 4));
}

const addBlock = function(name, area, typeSettings, initalData)
{
    var settings = getBlockSettings(name, area, typeSettings, initalData);

    if (!fs.existsSync(settings.rootDirectory)){

        directories.add(settings);
        markup.add(settings);
        scss.add(settings);
        dataProccess.add(settings);
        schemaProcess.add(settings); 

        console.log('Added new block '+ settings.fileName);
    }
    else
    {
        console.warn(`This block already exists at ${settings.rootDirectory}`);
    }

}

const addState = function(name, area, state, typeSettings)
{
    var settings = getBlockSettings(name, area, typeSettings);
    state = kebabCase(state);

    if (fs.existsSync(settings.rootDirectory)){

        dataProccess.addState(state, settings);

        console.log('Added new block '+ settings.fileName);
    }
    else
    {
        console.warn(`This block doesn't exist ${settings.rootDirectory}`);
    }

}

const renameBlock = function(oldName, newName, area, typeSettings)
{

    var oldSettings = getBlockSettings(oldName, area, typeSettings);
    var newSettings = getBlockSettings(newName, area, typeSettings);

    if(!fs.existsSync(newSettings.rootDirectory))
    {
        directories.rename(oldSettings, newSettings);
        markup.rename(oldSettings, newSettings);
        scss.rename(oldSettings, newSettings);
        dataProccess.rename(oldSettings, newSettings);
        schemaProcess.rename(oldSettings, newSettings); 

        console.log('Renamed block '+ oldName +' '+ newName);
    }
    else
    {
        console.warn(`Can't rename to new block it already exists at ${newSettings.rootDirectory}`);
    }
}

module.exports = { settings, addBlock, addState, renameBlock };