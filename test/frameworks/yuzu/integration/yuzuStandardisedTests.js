const tests = require('../../../testIndex');

describe('yuzu integration', function() {

    const cardTests = tests.cardTests();

    const context = {
        modules: ['schema', 'scss.bem', 'hbs.settings', 'yuzu'],
        createdFiles: ['data\\parSimplest.json', 'parSimplest.hbs', '_parSimplest.scss', 'parSimplest.schema']
    };

    cardTests.run(context);

});