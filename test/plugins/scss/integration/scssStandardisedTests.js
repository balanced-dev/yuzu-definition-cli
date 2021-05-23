const tests = require('../../../testIndex');

describe('scss bem integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('scss', createExpected);

    const context = {
        modules: ['scss.bem'],
        output: ['test', 'plugins', 'scss', 'integration', 'output'],
        createdFiles: ['simplest.html', 'simplest.scss']
    };

    cardTests.run(context);

});