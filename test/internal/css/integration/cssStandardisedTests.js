const tests = require('../../../testIndex');

describe('css integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('css', createExpected);

    const context = {
        modules: [],
        output: ['test', 'internal', 'css', 'integration', 'output'],
        createdFiles: ['simplest.html', 'simplest.css']
    };

    cardTests.run(context);

});