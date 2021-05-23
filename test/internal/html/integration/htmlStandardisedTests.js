const tests = require('../../../testIndex');

describe('html integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('html', createExpected);

    const context = {
        modules: [],
        output: ['test', 'internal', 'html', 'integration', 'output'],
        createdFiles: ['simplest.html', 'simplest.css']
    };

    cardTests.run(context);

});