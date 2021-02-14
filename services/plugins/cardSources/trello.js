const _ = require('lodash'),
    trello = require('./trelloRepo');

    //const logger = require('../../services/logger');

const getLists = async function(config) {
    return await trello.getBoardLists(config);
};

const buildList = function(list, config, addBlockPage) {
    trello.getCardLists(list, config, processLists);
};

const processLists = function(lists, config, addBlockPage) {
    let blockList = trello.getCardList('block', lists, config),
        pageList = trello.getCardList('page', lists, config);

    _.each(blockList, function(card) {
        processCard(card, 'block', config, addBlockPage);
    });
    _.each(pageList, function(card) {
        processCard(card, 'page', config, addBlockPage);
    });
};

const processCard = function(card, type, config, addBlockPage) {
    //logger.log({
    //    level: 'info',
    //    message: 'Processing'+ type+' Card =' + JSON.stringify(card, null, 4)
    //});
    trello.getCardSchema(card, type, config, function(cardSchema) {
        addBlockPage(type, cardSchema, config);
    });
};

module.exports = { getLists, buildList };