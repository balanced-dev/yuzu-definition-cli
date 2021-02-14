const getLists = function(config) { }

const buildList = function(list, config, addBlockPage, fs) {
    list.forEach(item => {
        addBlockPage(item.type, item.card, config, fs);
    });
};

module.exports = { getLists, buildList };