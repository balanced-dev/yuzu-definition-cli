let log = [];
const logger = {
    error: (message) => {
        log.push(message);
    }
}

const should = require('should'),
    base = require('./base.js')(logger),
    assert = require('assert');


describe('base', function() {

    describe('data integration tests errors', function() {	

        beforeEach(function() {
            log = [];
        });

        it('should ignore additional text', function() {	
        
            var card = {
                content:
                    'Before text\n'+
                    '\n'+
                    'Schema:\n'+
                    '- title\n'+
                    '- bodyText\n'+
                    '\n'+
                    'After text\n'
            };

            var output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Before text (not in scope)');
            assert.strictEqual(log[3], 'After text (not in scope)');

            assert.deepStrictEqual(output, {
                "title": "",
                "bodyText": ""
            });
        });

        it('should ignore properties that come after empty line termination', function() {	
        
            var card = {
                content:
                    'Schema:\n'+
                    '- title\n'+
                    '- bodyText\n'+
                    '\n'+
                    '- item_1\n'
            };

            var output = base.svc.createCardJson(card, base.settings);

            assert.deepStrictEqual(output, {
                "title": "",
                "bodyText": ""
            });
        });

        it('should ignore incorrect property and log errors', function() {	
        
            var card = {
                content:
                    'Schema:\n'+
                    '- title\n'+
                    'invalid line.\n'+
                    '- bodyText'
            };

            var output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'invalid line. (incorrect property prefix)');

            assert.deepStrictEqual(output, {
                "title": "",
                "bodyText": ""
            });
        });

        it('should not add when property name not defined against type', function() {	
        
            var card = {
                content:
                    'Schema:\n'+
                    '- string+\n'
            };

            base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], '- string+ (has empty line segment)')
        });

        it('should trim extra spaces in segments', function() {	
        
            var card = {
                content:
                    'Schema:\n'+
                    '- number+ itemCount'
            };

            const output = base.svc.createCardJson(card, base.settings);

            assert.deepStrictEqual(output, {
                "itemCount": 0
            });
        });

        it('should ignore wrong card property prefixes', function() {	
        
            var card = {
                content:
                    'Schema:\n'+
                    ' -integer+value\n'+
                    '-- string+name\n'
            };

            var output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], ' -integer+value (incorrect property prefix)');
            assert.strictEqual(log[2], '-- string+name (incorrect property prefix)');
        });

        it('should not add unnamed properties', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- string+test\n'+
                         '- \n'+
                         '-  '
            }; 

            base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], '-   (not in scope)')
        });


        it('should not have invalid property name', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- string+example\n'+
                         '- example+object+exampleObj'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Type mismatch "exampleObj" in "example". Ensure parent ("example") is object.')
        });

        it('should have property name that start with an alpha character', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- string+&\n'+
                         '- array+1title'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], '- string+& (property name has first character that is non alpha)');
            assert.strictEqual(log[2], '- array+1title (property name has first character that is non alpha)');
        });

        it('should error on misspelled types', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- stringarray+names\n'+
                         '- sTring+messages\n'+
                         '- subblock+parBlock+exampleBlock'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Unable to create property "names" in "stringarray". Property type is not recognised or object is not initialised.');
            assert.strictEqual(log[2], 'Unable to create property "messages" in "sTring". Property type is not recognised or object is not initialised.');
            assert.strictEqual(log[3], 'Unable to create property "exampleBlock" in "subblock,parBlock". Property type is not recognised or object is not initialised.');
        });

        it('should error on nested property with no object', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- nonExistantObject+string+property'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Unable to create property "property" in "nonExistantObject". Property type is not recognised or object is not initialised.');
        });

        it('should error on duplicate property at root', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                         '- string+property\n'+
                         '- number+property\n'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Property at path \"property\" is duplicated.');
        });

        it('should error on duplicate property on object', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                    '- object+appearance\n' +
                    '- appearance+title\n' +
                    '- appearance+title\n'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Property at path \"appearance.title\" is duplicated.');
        });

        it('should error when property name is reserved keyword on type', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                    '- string'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], '"string" cannot be used as a property name, it is a reserved keyword.');
        });

        it('should error when property name is reserved keyword on object property', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                    '- object+link\n'+
                    '- link+string\n'+
                    '- link+string+number\n'+
                    '- link+object+childLink\n'+
                    '- link+childLink+string\n'+
                    '- link+childLink+string+number'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], '"string" cannot be used as a property name, it is a reserved keyword.');
            assert.strictEqual(log[2], '"number" cannot be used as a property name, it is a reserved keyword.');
            assert.strictEqual(log[3], '"link.string" cannot be used as a property name, it is a reserved keyword.');
            assert.strictEqual(log[4], '"link.number" cannot be used as a property name, it is a reserved keyword.');
        });

        it('should error when property name not set on subBlock', function() {	
        
            var card = {
                name: 'block',
                content: 'Schema:\n'+
                    '- subBlock+parExample'
            }; 

            const output = base.svc.createCardJson(card, base.settings);

            assert.strictEqual(log[1], 'Property name not set for subBlock+parExample.');
        });


    })
    
});