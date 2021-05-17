const should = require('should'),
    rewire = require('rewire');
const svc = rewire('../../../generation/cardToComponent');

describe('base', function() {
    describe('card to component tests', function() {	
            
        let addedBlockName = '';

        svc.__set__({
            data: {
                createCardJson: () => {}
            },
            creation: {
                addBlock: (type, name) => { addedBlockName = name; }
            },
        });

        let log = [];
        const config = require('../../../config/configFactory').createForTesting({ modules: ['hbs.settings'] });
        config.logger = {
            error: (message) => {
                log.push(message);
            },
            info: (message) => {
                log.push(message);
            },
            isEmpty: () => {
                log.should.be.empty();
            }
        };

        it('Should add error log when component name is not valid', function() {
            
            const card = {
                name: 'Blokc- malformedFilename',
                content: ''
            }

            svc.run(card, config)

            log[0].should.equal('Card title invalid Blokc- malformedFilename');

        });

        it('Should convert card names with spaces into camel case', function() {
            
            const card = {
                name: 'Block - filename with spaces',
                content: ''
            }

            svc.run(card, config)

            addedBlockName.should.equal('filenameWithSpaces');

        });

    }) 
});