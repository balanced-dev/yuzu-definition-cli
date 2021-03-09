const init_tests_by_writing_actual_to_expected = false;

const config = require('../../config/defaults/vue');

const tests = require('./helpers/test-helper')(config, 'vue', 'vue', init_tests_by_writing_actual_to_expected);
const source = tests.setupLocalFileSource('test', 'integration', 'cards');
tests.setupResultsOutput('test', 'integration', 'results');

describe('vue layout integration tests', function() {

    beforeEach(tests.beforeEach);

    afterEach(function() { tests.afterEach(this.currentTest); });

    it('load-list', function() {
        tests.load_list('layout');
    });

    source.getCards('layout', config).forEach(element => {

        it(element.name, function() {
            tests.actualEqualsExpected(this.test);
        });

    });

});