const   fs = require('fs'),
        path = require('path');

const getLists = function(config) {
    var localFilesDirectory = config.localFiles.directoryPath;
    if (fs.existsSync(localFilesDirectory)) {        
        let lists =  fs.readdirSync(localFilesDirectory);
        lists = lists.filter(item => fs.statSync(path.join(localFilesDirectory, item)).isDirectory());

        if(lists.length !== 0) {
            return lists;
        }
        else {
            console.error('No directories found in "'+localFilesDirectory+'"');
        }
    }
    else {
        console.error('The directory "'+localFilesDirectory+'" does not exist');
    }
}

const buildList = function(list, config, addBlockPage) {
    run(list, config, addBlockPage);
};

const run = function(list, config, addBlockPage) {
    var localFilesDirectory = path.join(config.localFiles.directoryPath, list);
    fs.readdirSync(localFilesDirectory).forEach(file => {
        let filePath = path.join(localFilesDirectory, file);

        let stat = fs.statSync(filePath);
        if(stat.isFile()) {
            let extension = path.extname(filePath),
                fileContents = fs.readFileSync(filePath, 'utf8'),
                blockPageName = path.basename(filePath, extension),
                type = getType(blockPageName, config);
            
            blockPageName = blockPageName.replace(settings.prefixes[type].card, '');

            addBlockPage(type, 
                {
                    name: blockPageName,
                    schema: fileContents
                }, config
            );
        }
    });
};

const getType = function(name, config) {
    let blockPrefix = settings.prefixes.block.card,
        pagePrefix = settings.prefixes.page.card;

    if(name.startsWith(blockPrefix)) {
        return 'block';
    }
    else if(name.startsWith(pagePrefix)) {
        return 'page';
    }
};

module.exports = { getLists, buildList };