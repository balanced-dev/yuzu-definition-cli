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
            const extension = path.extname(filePath);
            const fileName = path.basename(filePath, extension);

            var file = {
                content: fs.readFileSync(filePath, 'utf8'),
                name: fileName
            };

            if(isFileAllowed(fileName, config)) {
                output.push(file);
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

const buildList = function(list, config, cardToComponent) {
    var cardList = getCards(list, config);
    cardList.forEach(card => {
        cardToComponent(card, config);
    });
    return cardList;
};

module.exports = () => {

    return { 
        getLists, 
        buildList, 
        getCards 
    };

};