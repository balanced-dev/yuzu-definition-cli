const tests = require('../../testIndex');

describe('schema integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('schema', createExpected);

    const context = {
        modules: ['schema', 'hbs.settings'],
        output: ['test', 'schema', 'integration', 'output'],
        createdFiles: ['simplest.hbs', 'simplest.schema', 'simplest.css']
    };

    cardTests.run(context);

});