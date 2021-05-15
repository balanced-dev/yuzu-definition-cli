const tests = require('../../testIndex');

describe('scss bem integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('scss', createExpected);

    const context = {
        modules: ['scss.bem', 'hbs.settings'],
        output: ['test', 'scss', 'integration', 'output'],
        createdFiles: ['simplest.hbs', 'simplest.scss']
    };

    cardTests.run(context);

});