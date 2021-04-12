const init_tests_by_writing_actual_to_expected = false;

const tests = require('../../../base/integration/_helpers/test-helper')('vue', init_tests_by_writing_actual_to_expected);
tests.buildConfig(['scss', 'vue.settings', 'vue.single-file-component'], ['test', 'base', 'integration', 'input']);
tests.setupResultsOutput('test', 'vue', 'integration', 'output');

describe('vue layout integration tests', function() {

    beforeEach(tests.beforeEach);

    afterEach(function() { tests.afterEach(this.currentTest); });

    it('load-list', function() {
        tests.load_list('layout');
    });

    tests.config.source.getCards('layout', tests.config).forEach(element => {

        it(element.name, function() {
            tests.actualEqualsExpected(this.test);
        });

    });
    
});