const init_tests_by_writing_actual_to_expected = false;

const tests = require('../../../base/integration/_helpers/test-helper')('hbs', init_tests_by_writing_actual_to_expected);
tests.buildConfig(['scss', 'hbs.settings'], ['test', 'base', 'integration', 'input']);

describe('hbs integration', function() {
    describe('cards tests', function() {

        this.beforeAll(function() {
            tests.setupResultsOutput('test', 'hbs', 'integration', 'output');
        });

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
        
    }) 
});