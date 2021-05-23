const should = require('should');
const path = require('path');

describe('local files integration', function() {
    
    const sourceDirs = ['test', 'base', 'integration', 'input'];
    
    const userConfig = 
    {
        modules: [],
        source: {
            name: 'localFiles',
            settings: {
                directoryPath: path.resolve(...sourceDirs)
            }
        }
    }

    const cardToComponent = () => {};
    
    let config = {};

    beforeEach(() => {
        config = require('../../../../config/configFactory').createForTesting(userConfig);
    });

    it('can get cards for a list', async () => {
            
        var cards = await config.source.buildList("simple", config, cardToComponent);
        cards.length.should.equal(1);
    });

    it('can get lists', async () => {
            
        var lists = await config.source.getLists(config);
        lists.length.should.equal(2);
    });

});
