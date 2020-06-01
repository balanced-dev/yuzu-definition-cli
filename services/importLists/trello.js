const _ = require('lodash'),
    Trello = require("node-trello"),
    path = require('path'),
    settings = require('../importConfig/settings').settings;

const trelloConfig = settings.trello;

const t = new Trello(trelloConfig.key, trelloConfig.secret);

const params = {
    filter: 'open', 
    fields: 'name'
};

const makeTrelloRequest = async function(url, params) {
    return new Promise(resolve => { 
        t.get(url, params, function (err, data) {
            if (err) throw err;            
            resolve(data);
        });
    });
};

const getBoardLists = async function(boardName = trelloConfig.board) {
    if(boardName) {
        if(trelloConfig.key && trelloConfig.secret) {
            let boards = await makeTrelloRequest("/1/members/me/boards", params),
                board = _.find(boards, function (o) { return o.name == boardName });
            
            if(board) {
                let lists = await makeTrelloRequest("/1/boards/" + board.id + "/lists", params);
                return lists;
            }
            else {
                console.error('The board "' + trelloConfig.board + '" cannot be found');
            }
        }
        else {
            console.error('Trello improperly configured. Key and/or secret value not applied in config/default.json');
        }
    }
    else {
        console.error("No board name passed. Please ensure it's set in the config json file");
    }
};

const getLists = async function() {
    return await getBoardLists();
};

module.exports = { getLists };