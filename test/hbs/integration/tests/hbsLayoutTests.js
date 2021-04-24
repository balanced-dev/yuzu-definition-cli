const tests = require('../../../testIndex');

describe('hbs integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('hbs', createExpected);

    const context = {
        modules: ['scss', 'hbs.settings'],
        output: ['test', 'hbs', 'integration', 'output'],
        createdFiles: ['simplest.hbs', '_simplest.scss', 'simplest.schema']
    };

    cardTests.run(context);

});