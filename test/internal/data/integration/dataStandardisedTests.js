const tests = require('../../../testIndex');

describe('data integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('json', createExpected);

    const context = {
        modules: [],
        output: ['test', 'internal', 'data', 'integration', 'output'],
        createdFiles: ['simplest.json'],
        tweakConfig: (config) => {
            config.createThese = ['data'];
        }
    };

    cardTests.run(context);

});