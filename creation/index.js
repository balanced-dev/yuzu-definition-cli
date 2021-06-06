const settings = function(config)
{
    var settings = config.creation.createComponentMeta(config);

    console.log(JSON.stringify(settings, null, 4));
}

const addBlock = function(config, type, area, name, contentIntercepts)
{
    let componentMeta = config.creation.createComponentMeta(config, type, area, name, '', contentIntercepts);

    if (config.fs.dirExists(componentMeta.rootDirectory) && config.directories.settings.createForComponent)
    {
        console.warn(`This block already exists at ${componentMeta.rootDirectory}`);
    }
    else
    {
        let creators = config.creators
            .filter((item) => { return config.createThese.includes(item.name) })

        creators.forEach((creator) => {
            creator.module.add(componentMeta, config);
        });
    }

}

const addState = function(config, type, area, name, state)
{
    var componentMeta = config.creation.createComponentMeta(config, type, area, name, state);

    if (config.fs.existsSync(componentMeta.rootDirectory)){

        dataProccess.addState(state, componentMeta, config);

        console.log(`Added new state (${name}) to ${componentMeta.fileName}`);
    }
    else
    {
        console.warn(`This ${type} doesn't exist ${componentMeta.rootDirectory}`);
    }

}

const renameBlock = function(config, type, area, oldName, newName)
{

    var componentMetaOld = config.creation.createComponentMeta(config, type, area, oldName);
    var componentMetaNew = config.creation.createComponentMeta(config, type, area, newName);

    if(!fs.existsSync(newSettings.rootDirectory))
    {
        directories.rename(componentMetaOld, componentMetaNew);
        markup.rename(componentMetaOld, componentMetaNew);
        scss.rename(componentMetaOld, componentMetaNew);
        dataProccess.rename(componentMetaOld, componentMetaNew);
        schemaProcess.rename(componentMetaOld, componentMetaNew); 

        console.log(`Renamed the ${type} "${oldName}" to "${newName}"`);
    }
    else
    {
        console.warn(`Can't rename ${type}: it already exists at ${componentMetaNew.rootDirectory}`);
    }
}



module.exports = { settings, addBlock, addState, renameBlock };