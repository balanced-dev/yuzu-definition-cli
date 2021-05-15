const should = require('should');

let log = [];
const logger = {
    error: (message) => {
        log.push(message);
    },
    isEmpty: () => {
        log.should.be.empty();
    }
}

const base = require('./base.js')(logger),
    assert = require('assert');


describe('base', function() {

    describe('data integration tests', function() {	
            
        it('Never adds schema line', function() {	
        
            var card = {
                content: 'Schema:\n'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.hasOwnProperty('schema').should.equal(false);
            logger.isEmpty();
        });

        it('Should parse default property as string with value of empty string', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- title'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.hasOwnProperty('title').should.equal(true);
            output.title.should.equal('');
            logger.isEmpty();
        });		

        it('Should parse string property with value of empty string', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- string+title'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.title.should.equal('');
            logger.isEmpty();
        });	

        it('Should parse integer property with value of 0', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- integer+age'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.age.should.equal(0);
            logger.isEmpty();
        });	

        it('Should parse boolean property with value of true', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- boolean+hidden'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.hidden.should.equal(true);
            logger.isEmpty();
        });	

        it('Should parse object', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- object+appearance\n' +
                         '- appearance+title\n' +
                         '- appearance+boolean+hidden\n'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.appearance.title.should.equal('');
            output.appearance.hidden.should.equal(true);
            logger.isEmpty();
        });	

        it('Should parse simple array with multiple properties', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- array+pets\n' +
                         '- pets+boolean+isFriendly\n' +
                         '- pets+string+name\n'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.pets[0].isFriendly.should.equal(true);
            output.pets[0].name.should.equal('');
            logger.isEmpty();
        });	

        it('Should parse sub object', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- subBlock+parPetInformation+pet\n'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.pet.$ref.should.equal('/parPetInformation');
            logger.isEmpty();

        });	

        it('Should parse array sub object as a property', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- array+items\n' +
                         '- items+string+title\n' +
                         '- items+subBlock+parDataImage+headshot'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.items[0].headshot.$ref.should.equal('/parDataImage');
            logger.isEmpty();

        });	

        
        it('Should parse array sub objects', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- array+items\n' +
                         '- items+subBlock+parDataImage'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.items[0].$ref.should.equal('/parDataImage');
            logger.isEmpty();

        });

        it('Should parse array of multiple sub-blocks (anyOf)', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- array+items\n' +
                         '- items+subBlock+parDataImage\n' +
                         '- items+subBlock+parThumbnail'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.items[0].$ref.should.equal('/parDataImage');
            output.items[1].$ref.should.equal('/parThumbnail');
            logger.isEmpty();

        });

        it('Should parse array of multiple nested sub objects', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- array+containingArray\n' +
                         '- containingArray+array+subArray\n' +
                         '- containingArray+subArray+subBlock+parDataImage\n' +
                         '- containingArray+subArray+subBlock+parBackgroundImage\n' +
                         '- containingArray+subArray+subBlock+parThumbnail'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            output.containingArray[0].subArray[0].$ref.should.equal('/parDataImage');
            output.containingArray[0].subArray[1].$ref.should.equal('/parBackgroundImage');
            output.containingArray[0].subArray[2].$ref.should.equal('/parThumbnail');
            logger.isEmpty();

        });

        it('Should parse array of strings/integers/numbers', function() {	
        
            var card = {
                content: 'Schema:\n'+
                         '- stringArray+arrayName\n' +
                         '- array+containingArray\n' +
                         '- containingArray+numberArray+numberList\n' +
                         '- containingArray+integerArray+integerList\n' +
                         '- containingArray+stringArray+stringList'
            }; 

            var output = base.svc.createCardJson(card, base.settings);

            assert.deepStrictEqual(output, {
                "arrayName": [""],
                "containingArray": [
                    {
                        "numberList": [0.1],
                        "integerList": [0],
                        "stringList": [""]
                    }
                ]
            });
            logger.isEmpty();

        });

        /*it('demo test case', function() {

            var text = 
            'Schema:\n'+
            '- subBlock+parDataImage+background\n'+
            '- title\n'+
            '- description\n'+
            '- array+socialLinks\n'+
            '- socialLinks+subBlock+parDataLink\n'+
            '- subBlock+parDataLink+link';

            var output = base.svc.createCardJson(text, base.settings);

        })*/

    })
});