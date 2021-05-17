const should = require('should');

describe('trello integration', function() {
    
    const userConfig = 
    {
        modules: ['hbs.settings'],
        source: {
            name: "trello",
            settings: {
                board: "Northern Group - Blocking",
                key: "a1572727cc6e8d4a94c51f284d323952",
                secret: "b48a33a6861b9c1ca9caa350d8be7c34986f4822d70a81c19e28eeb265680fcf"
            }
        }
    };
    
    const cardToComponent = () => {};
    
    let config = {};

    beforeEach(() => {
        config = require('../../../../config/configFactory').createForTesting(userConfig);
    });

    it('can get cards for a list', async () => {
            
        var cards = await config.source.buildList({name: "Layout"}, config, cardToComponent);
        cards.length.should.equal(4);
    });

    it('can get lists', async () => {
            
        var lists = await config.source.getLists(config);
        lists.length.should.equal(12);
    });

});
