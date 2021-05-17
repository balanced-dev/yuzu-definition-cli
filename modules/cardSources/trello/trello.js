const _ = require('lodash'),
    trello = require('./trelloRepo');

    //const logger = require('../../services/logger');

const getLists = async function(config) {
    return await trello.getBoardLists(config);
};

const buildList = async function(list, config, cardToComponent, fs) {
    return trello.getCardLists(list, config, cardToComponent, fs, processLists);
};

const processLists = function(lists, config, cardToComponent, fs) {
    let blockList = trello.getCardList('block', lists, config),
        pageList = trello.getCardList('page', lists, config);

    _.each(blockList, function(card) {
        processCard(card, 'block', config, cardToComponent, fs);
    });
    _.each(pageList, function(card) {
        processCard(card, 'page', config, cardToComponent, fs);
    });
};

const processCard = function(card, type, config, cardToComponent, fs) {
    //logger.log({
    //    level: 'info',
    //    message: 'Processing'+ type+' Card =' + JSON.stringify(card, null, 4)
    //});
    trello.getCardSchema(card, type, config, (card) => {
        cardToComponent(card, config, fs);
    });
};

module.exports = () => {

    return { getLists, buildList };

};