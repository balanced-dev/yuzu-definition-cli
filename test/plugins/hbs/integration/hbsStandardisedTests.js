const tests = require('../../../testIndex');

describe('hbs integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('hbs', createExpected);

    const context = {
        modules: ['hbs.settings', 'hbs.prettier'],
        output: ['test', 'plugins', 'hbs', 'integration', 'output'],
        createdFiles: ['simplest.hbs', 'simplest.css']
    };

    cardTests.run(context);

});