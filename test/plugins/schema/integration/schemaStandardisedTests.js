const tests = require('../../../testIndex');

describe('schema integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('schema', createExpected);

    const context = {
        modules: ['schema'],
        output: ['test', 'plugins', 'schema', 'integration', 'output'],
        createdFiles: ['simplest.html', 'simplest.schema', 'simplest.css']
    };

    cardTests.run(context);

});