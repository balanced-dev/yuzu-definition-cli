const should = require('should');

module.exports = (ext, createExpected) => {

    const tests = require('./_helpers/test-helper')(ext, createExpected);
    const cardsDir = ['test', 'base', 'integration', 'input'];

    return {

        run: (context) => {

            tests.buildConfig (context.modules, cardsDir);

            describe('basic tests', function() {

                it('correct no of files', function() {
                        
                    tests.load_list('simple');
                    Object.keys(tests.addedFiles).length.should.equal(context.createdFiles.length);
                });
            
                it('creates component files', function() {
                    
                    tests.load_list('simple');
                    context.createdFiles.forEach((filename) => {
                        const addedFiles = Object.keys(tests.addedFiles);
                        addedFiles.includes(filename).should.equal(true, `component should include '${filename}' filename`);
                    }); 
                });
            });

            describe('card tests', function() {

                this.beforeAll(function() {
                    tests.setupResultsOutput(context.output);
                });
            
                beforeEach(tests.beforeEach);
            
                afterEach(function() { tests.afterEach(this.currentTest); });
            
                it('load-list', function() {
                    tests.load_list('standardisedTests');
                });
            
                tests.config.source.getCards('standardisedTests', tests.config).forEach(element => {
            
                    it(element.name, function() {
                        tests.actualEqualsExpected(this.test);
                    });
            
                });
                
            });
        }
        
    };

}
