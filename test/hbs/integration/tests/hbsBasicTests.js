const tests = require('../../../base/integration/_helpers/test-helper')('hbs');
tests.buildConfig(['yuzu', 'scss', 'hbs.settings'], ['test', 'base', 'integration', 'input']);

describe('hbs integration', function() {
    describe('basic tests', function() {

        beforeEach(tests.beforeEach);

        afterEach(function() { tests.afterEach(this.currentTest); });

        it('correct no of files', function() {
            
            tests.load_list('simple');
            tests.shouldHaveNoOfFiles(4);
        });

        it('creates hbs component', function() {
            
            tests.load_list('simple');
            tests.shouldHaveComponentName('simplest.vue');
        });

    }) 
});