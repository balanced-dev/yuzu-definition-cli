const _ = require('lodash'),
    trello = require('./trelloRepo');

    //const logger = require('../../services/logger');

const getLists = async function(config) {
    return await trello.getBoardLists(config);
};

const buildList = function(list, config, addBlockPage, fs) {
    trello.getCardLists(list, config, addBlockPage, fs, processLists);
};

const processLists = function(lists, config, addBlockPage, fs) {
    let blockList = trello.getCardList('block', lists, config),
        pageList = trello.getCardList('page', lists, config);

    _.each(blockList, function(card) {
        processCard(card, 'block', config, addBlockPage, fs);
    });
    _.each(pageList, function(card) {
        processCard(card, 'page', config, addBlockPage, fs);
    });
};

const processCard = function(card, type, config, addBlockPage, fs) {
    //logger.log({
    //    level: 'info',
    //    message: 'Processing'+ type+' Card =' + JSON.stringify(card, null, 4)
    //});
    trello.getCardSchema(card, type, config, (card) => {
        addBlockPage(card, config, fs);
    });
};

module.exports = () => {

    return { getLists, buildList };

};