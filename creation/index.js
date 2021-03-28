var fs = require('fs');
var camelCase = require('change-case').camelCase;
var kebabCase = require('change-case').paramCase;

const getBlockSettings = function(type, name, area, typeSettings, initialContentIntercepts, config, fs)
{
    return {
        prefix: config.prefixes[type].file,
        fileName: camelCase(name),
        className: kebabCase(name),
        directoryName: camelCase(name),
        rootDirectory: fs.getRoot(name, area, typeSettings, fs),
        subDirectories: {
            data: 'data'
        },
        contentIntercepts: initialContentIntercepts,
        config: config
    };
}

const settings = function(typeSettings)
{
    var settings = getBlockSettings('', '', typeSettings);

    console.log(JSON.stringify(settings, null, 4));
}

const addBlock = function(type, name, area, typeSettings, initialContentIntercepts, config, fs)
{
    var settings = getBlockSettings(type, name, area, typeSettings, initialContentIntercepts, config, fs);

    if (!fs.dirExists(settings.rootDirectory)){

        var processors = config.processors
            .filter((item) => { return config.processThese.includes(item.name) })

        processors.forEach((processor) => {
            processor.module.add(settings, fs);
        });

        console.log(`Added new ${type} "${settings.fileName}"`);
    }
    else
    {
        console.warn(`This block already exists at ${settings.rootDirectory}`);
    }

    return {

    }

}

const addState = function(type, name, area, state, typeSettings)
{
    var settings = getBlockSettings(name, area, typeSettings);
    state = kebabCase(state);

    if (fs.existsSync(settings.rootDirectory)){

        dataProccess.addState(state, settings);

        console.log(`Added new state (${name}) to ${settings.fileName}`);
    }
    else
    {
        console.warn(`This ${type} doesn't exist ${settings.rootDirectory}`);
    }

}

const renameBlock = function(type, oldName, newName, area, typeSettings)
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

        console.log(`Renamed the ${type} "${oldName}" to "${newName}"`);
    }
    else
    {
        console.warn(`Can't rename ${type}: it already exists at ${newSettings.rootDirectory}`);
    }
}

module.exports = { settings, addBlock, addState, renameBlock };