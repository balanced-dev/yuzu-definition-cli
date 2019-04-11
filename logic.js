var fs = require('fs');
var camelCase = require('camelcase');

var directories = require('./services/directories.js');
var markup = require('./services/markup.js');
var scss = require('./services/scss.js');
var dataProccess = require('./services/data.js');
var schemaProcess = require('./services/schema.js');

const getBlockSettings = function(name)
{

    return {
        fileName: camelCase(name),
        className: name.replace(/ /g, '-').toLowerCase(),
        directoryName: camelCase(name),
        rootDirectory: `${__dirname}/${name}`,
        subDirectories: {
            data: 'data'
        },
        get data() {
            return {};
        }
    };
}

const addBlock = function(blocName)
{
    var settings = getBlockSettings(blocName);

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

const renameBlock = function(oldName, newName)
{

    var oldSettings = getBlockSettings(oldName);
    var newSettings = getBlockSettings(newName);

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

module.exports = { addBlock, renameBlock };