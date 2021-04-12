const tests = require('../../../base/integration/_helpers/test-helper')('vue');
tests.buildConfig(['yuzu', 'scss', 'vue.settings', 'vue.single-file-component'], ['test', 'base', 'integration', 'input']);

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