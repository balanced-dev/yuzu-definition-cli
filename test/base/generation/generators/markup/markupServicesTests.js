const should = require('should'),
    rewire = require('rewire'),
    buildHtmlString = rewire('../../../../../generation/generators/markup/services/buildHtmlString.js'),
    camelCaseToKebabCase = rewire('../../../../../generation/generators/markup/services/camelCaseToKebabCase.js'),
    trimRefValue = rewire('../../../../../generation/generators/markup/services/trimRefValue.js');

describe('base', function() {
    describe('markup sevices tests', function() {	
            
        
        it('Should join html lines', function() {
            let output = buildHtmlString.run([
                '<div class="test-block">',
                '<div class="test-block__text">',
                '{{text}}',
                '</div>',
                '</div>',
            ]);
            
            output.should.equal('<div class="test-block">\n<div class="test-block__text">\n{{text}}\n</div>\n</div>\n');
        });

        it('Should convert from camel case to kebab case', function() {
            let output = camelCaseToKebabCase.run('thisIsATest');
            
            output.should.equal('this-is-a-test');
        });

        it('Should maintain kebab case', function() {
            let output = camelCaseToKebabCase.run('this-is-a-test');
            
            output.should.equal('this-is-a-test');
        });

        it('Should trim "/" from $ref values', function() {
            let output = trimRefValue.run('/parSubBlock');
            
            output.should.equal('parSubBlock');
        });

        it('Should not remove any characters if $ref value is already correct', function() {
            let output = trimRefValue.run('parSubBlock');
            
            output.should.equal('parSubBlock');
        });

    }) 
});