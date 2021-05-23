const _ = require('lodash'),
    trello = require('./trelloRepo');

    //const logger = require('../../services/logger');

const getLists = async function(config) {
    return await trello.getBoardLists(config);
};

const buildList = async function(list, config, cardToComponent) {
    return trello.getCardLists(list, config, cardToComponent, processLists);
};

const processLists = function(lists, config, cardToComponent) {
    let blockList = trello.getCardList('block', lists, config),
        pageList = trello.getCardList('page', lists, config);

    _.each(blockList, function(card) {
        processCard(card, 'block', config, cardToComponent);
    });
    _.each(pageList, function(card) {
        processCard(card, 'page', config, cardToComponent);
    });
};

const processCard = function(card, type, config, cardToComponent) {
    //logger.log({
    //    level: 'info',
    //    message: 'Processing'+ type+' Card =' + JSON.stringify(card, null, 4)
    //});
    trello.getCardSchema(card, type, config, (card) => {
        cardToComponent(card, config);
    });
};

module.exports = () => {

    return { getLists, buildList };

};