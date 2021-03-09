const _ = require('lodash'),
    Trello = require("node-trello");

//const logger = require('../logger');

const params = {
    filter: 'open', 
    fields: 'name'
};

const makeTrelloRequest = async function(url, params, config) {
    const t = new Trello(config.trello.key, config.trello.secret);
    return new Promise(resolve => { 
        t.get(url, params, function (err, data) {
            if (err) throw err;            
            resolve(data);
        });
    });
};

const getBoardLists = async function(config) {
    var boardName = config.trello.board;
    if(boardName) {
        if(config.trello.key && config.trello.secret) {
            let boards = await makeTrelloRequest("/1/members/me/boards", params, config),
                board = _.find(boards, function (o) { return o.name == boardName });
            
            if(board) {
                let lists = await makeTrelloRequest("/1/boards/" + board.id + "/lists", params, config);
                return lists;
            }
            else {
                console.error('The board "' + config.trello.board + '" cannot be found');
            }
        }
        else {
            console.error('Trello improperly configured. Key and/or secret value not applied in config/default.json');
        }
    }
    else {
        console.error("No board name passed. Please ensure it's set in the config.json");
    }
};

const getCardLists = async function (list, config, addBlockPage, fs, callback) {
    
    let configList = list ? list : config.list;
    
    let boardData = await getBoardLists(config),
        boardList = _.find(boardData, function (o) { return o.name == configList.name });
    if (boardList) {
        /*logger.log({
            level: 'info',
            message: 'Get board list=' + JSON.stringify(boardList, null, 4)
        });*/
        const card = await makeTrelloRequest("/1/lists/" + boardList.id + "/cards", params, config);
        callback(card, config, addBlockPage, fs);
        /*logger.log({
            level: 'info',
            message: 'Get board list=' + JSON.stringify(boardList, null, 4)
        });*/
    }
    else {
        console.error('The list "' + configList + '" on the board "' + config.trello.board + '" cannot be found');
    }
};

const getCardList = function(cardType, cards, config) {
    return _.filter(cards, function (o) { 
        let cardPrefix = config.prefixes[cardType].card;
        return o.name.startsWith(cardPrefix); 
    });
};

const getCardSchema = async function (card, cardType, config, callback) {
    let trelloCard = card.id ? await makeTrelloRequest('/1/cards/' + card.id, null, config) : {},
        description = trelloCard.desc ? trelloCard.desc : undefined,
        cardSchema = {
            name: card.name ? card.name.replace(config.prefixes[cardType].card, '') : '',
            schema: ''
        };

    if(description && description.startsWith(config.prefixes.schema.card)) {
        cardSchema.schema = description;
        callback(cardSchema);
    }
    else {
        console.error(`Issue while retrieving "${cardSchema.name}". Schema in description was not able to be retrieved. Ensure description begins with "${settings.prefixes.schema.card}".`);
    }

};

module.exports = {getBoardLists, getCardLists, getCardList, getCardSchema};