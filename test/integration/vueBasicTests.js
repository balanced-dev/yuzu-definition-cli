const tests = require('./helpers/test-helper')('vue', 'vue');
tests.setupLocalFileSource('test', 'integration', 'cards');

describe('vue basic integration tests', function() {

    beforeEach(tests.beforeEach);

    afterEach(function() { tests.afterEach(this.currentTest); });

	it('correct no of files', function() {
        
        tests.load_list('simple');
        tests.shouldHaveNoOfFiles(2);
    });

    it('creates vue component', function() {
        
        tests.load_list('simple');
        tests.shouldHaveComponentName('simplest.vue');
    });

});