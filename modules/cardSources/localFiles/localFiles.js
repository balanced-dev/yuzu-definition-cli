const fs = require('fs');
const path = require('path');

const getLists = function(config) {
    var localFilesDirectory = config.sourceSettings.directoryPath;
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


const getCards = function(list, config) {
    var output = [];
    var localFilesDirectory = path.join(config.sourceSettings.directoryPath, list);
    const cardConfig = config.generation.card;

    fs.readdirSync(localFilesDirectory).forEach(file => {
        let filePath = path.join(localFilesDirectory, file);

        let stat = fs.statSync(filePath);
        if(stat.isFile()) {
            const extension = path.extname(filePath);
            const fileName = path.basename(filePath, extension);
            let type = getType(fileName, config);

            if(type && cardConfig.titlePrefixes[type]) {
                let blockName = fileName.replace(cardConfig.titlePrefixes[type], '');

                var file = {
                    content: fs.readFileSync(filePath, 'utf8'),
                    name: blockName,
                    type: type
                };
    
                if(isFileAllowed(fileName, config)) {
                    output.push(file);
                }
            }
            else {
                config.logger.error(`Card title invalid ${fileName}`)
            }


        }
    });
    return output;
};

const isFileAllowed = (fileName, config) => {

    if(config.sourceSettings.cards) {
        var cards = config.sourceSettings.cards
        return cards.some(() => { return true;}) ? cards.includes(fileName) : true;
    }
    return true;
}

const buildList = function(list, config, addBlockPage, fsOutput) {
    var cardList = getCards(list, config);

    cardList.forEach(card => {
        addBlockPage(card, config, fsOutput);
    });
};

const getType = function(name, config) {
    let blockPrefix = config.generation.card.titlePrefixes.block,
        pagePrefix = config.generation.card.titlePrefixes.page;

    if(name.startsWith(blockPrefix)) {
        return 'block';
    }
    else if(name.startsWith(pagePrefix)) {
        return 'page';
    }
};

module.exports = () => {

    return { 
        getLists, 
        buildList, 
        getCards 
    };

};