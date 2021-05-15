const tests = require('../../testIndex');

describe('hbs integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('hbs', createExpected);

    const context = {
        modules: ['scss.bem', 'hbs.settings', 'hbs.prettier'],
        output: ['test', 'hbs', 'integration', 'output'],
        createdFiles: ['simplest.hbs', 'simplest.scss']
    };

    cardTests.run(context);

});