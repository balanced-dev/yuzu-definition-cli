const tests = require('../../../testIndex');

describe('hbs integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests(['hbs', 'scss'], createExpected);

    const context = {
        modules: ['scss', 'hbs.settings'],
        output: ['test', 'hbs', 'integration', 'output'],
    };

    cardTests.run(context);

});