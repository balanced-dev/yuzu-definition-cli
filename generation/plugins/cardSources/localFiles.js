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
    fs.readdirSync(localFilesDirectory).forEach(file => {
        let filePath = path.join(localFilesDirectory, file);

        let stat = fs.statSync(filePath);
        if(stat.isFile()) {
            let extension = path.extname(filePath);
            let name = path.basename(filePath, extension);
            let type = getType(name, config);
            name = name.replace(config.prefixes[type].card, '');

            var file = {
                contents: fs.readFileSync(filePath, 'utf8'),
                name: name,
                type: type
            };
            output.push(file);
        }
    });
    return output;
};

const buildList = function(list, config, addBlockPage, fsOutput) {
    var cardList = getCards(list, config);

    cardList.forEach(card => {
       
        addBlockPage(card.type, 
            {
                name: card.name,
                schema: card.contents
            }, config, fsOutput
        );

    });
};

const getType = function(name, config) {
    let blockPrefix = config.prefixes.block.card,
        pagePrefix = config.prefixes.page.card;

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