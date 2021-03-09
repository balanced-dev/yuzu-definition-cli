const should = require('should'),
    base = require('./base.js'),
    assert = require('assert');

describe('Data service integration tests', function() {	
        
    
	it('Never adds schema line', function() {	
    
        var text = 
        'Schema:\n';

        var output = base.svc.createCardJson(text, base.settings);

        output.hasOwnProperty('schema').should.equal(false);
    });

	it('Never add unnamed properties', function() {	
    
        var text = 
        'Schema:\n'+
        '- string+test\n'+
        '- \n'+
        '-  ';

        var output = base.svc.createCardJson(text, base.settings);

        assert.deepEqual(output, {
            "test": ""
        });
    });

	it('Should parse default property as string with value of empty string', function() {	
    
        var text = 
        'Schema:\n'+
        '- title';

        var output = base.svc.createCardJson(text, base.settings);

        output.hasOwnProperty('title').should.equal(true);
        output.title.should.equal('');
    });		

    it('Should parse string property with value of empty string', function() {	
    
        var text = 
        'Schema:\n'+
        '- string+title';

        var output = base.svc.createCardJson(text, base.settings);

        output.title.should.equal('');
    });	

    it('Should parse integer property with value of 0', function() {	
    
        var text = 
        'Schema:\n'+
        '- integer+age';

        var output = base.svc.createCardJson(text, base.settings);

        output.age.should.equal(0);
    });	

    it('Should parse boolean property with value of true', function() {	
    
        var text = 
        'Schema:\n'+
        '- boolean+hidden';

        var output = base.svc.createCardJson(text, base.settings);

        output.hidden.should.equal(true);
    });	

    it('Should parse object', function() {	
    
        var text = 
        'Schema:\n'+
        '- object+appearance\n' +
        '- appearance+title\n' +
        '- appearance+boolean+hidden\n';

        var output = base.svc.createCardJson(text, base.settings);

        output.appearance.title.should.equal('');
        output.appearance.hidden.should.equal(true);
    });	

    it('Should parse simple array with multiple properties', function() {	
    
        var text = 
        'Schema:\n'+
        '- array+pets\n' +
        '- pets+boolean+isFriendly\n' +
        '- pets+string+name\n';

        var output = base.svc.createCardJson(text, base.settings);

        output.pets[0].isFriendly.should.equal(true);
        output.pets[0].name.should.equal('');
    });	

    it('Should parse sub object', function() {	
    
        var text = 
        'Schema:\n'+
        '- subBlock+parPetInformation+pet\n';

        var output = base.svc.createCardJson(text, base.settings);

        output.pet.$ref.should.equal('/parPetInformation');

    });	

    it('Should parse array sub object as a property', function() {	
    
        var text = 
        'Schema:\n'+
        '- array+items\n'+
        '- items+string+title\n'+
        '- items+subBlock+parDataImage+headshot';

        var output = base.svc.createCardJson(text, base.settings);

        output.items[0].headshot.$ref.should.equal('/parDataImage');

    });	

    
    it('Should parse array sub objects', function() {	
    
        var text = 
        'Schema:\n'+
        '- array+items\n'+
        '- items+subBlock+parDataImage';

        var output = base.svc.createCardJson(text, base.settings);

        output.items[0].$ref.should.equal('/parDataImage');

    });

    it('Should parse array of multiple sub-blocks (anyOf)', function() {	
    
        var text = 
        'Schema:\n'+
        '- array+items\n'+
        '- items+subBlock+parDataImage\n' +
        '- items+subBlock+parThumbnail';

        var output = base.svc.createCardJson(text, base.settings);

        output.items[0].$ref.should.equal('/parDataImage');
        output.items[1].$ref.should.equal('/parThumbnail');

    });

    it('Should parse array of multiple nested sub objects', function() {	
    
        var text = 
        'Schema:\n'+
        '- array+containingArray\n'+
        '- containingArray+array+subArray\n'+
        '- containingArray+subArray+subBlock+parDataImage\n' +
        '- containingArray+subArray+subBlock+parBackgroundImage\n' +
        '- containingArray+subArray+subBlock+parThumbnail';

        var output = base.svc.createCardJson(text, base.settings);

        output.containingArray[0].subArray[0].$ref.should.equal('/parDataImage');
        output.containingArray[0].subArray[1].$ref.should.equal('/parBackgroundImage');
        output.containingArray[0].subArray[2].$ref.should.equal('/parThumbnail');

    });

    it('Should parse array of strings/integers/numbers', function() {	
    
        var text = 
        'Schema:\n'+
        '- stringArray+arrayName\n'+
        '- array+containingArray\n'+
        '- containingArray+numberArray+numberList\n'+
        '- containingArray+integerArray+integerList\n'+
        '- containingArray+stringArray+stringList\n';

        var output = base.svc.createCardJson(text, base.settings);

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

});