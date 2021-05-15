const should = require('should');
const generator = require('../../../generation/index');
const fsStub = require('./_helpers/fsStub');
const addBlockPage = require('../../../generation/addBlockPage');
const path = require('path');

const cardsDir = ['test', 'base', 'integration', 'input'];

const userConfig = 
{
    modules: ['hbs.settings'],
    source: {
        name: 'localFiles',
        settings: {
            directoryPath: path.resolve(...cardsDir),
            cards: [
                'Block - additionalText'
            ]
        }
    }
};

let addedFiles = {};

let config = {};

describe('error tests', function() {

    beforeEach(() => {
        config = require('../../../config/configFactory').createForTesting(userConfig);
    });

    it('invalid block name', function() {
            
        generator.runSingleList('errors', config, addBlockPage, fsStub(addedFiles));
    });

});
