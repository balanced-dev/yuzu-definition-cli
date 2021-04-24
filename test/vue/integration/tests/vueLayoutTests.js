const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('vue', createExpected);

    const context = {
        modules: ['scss', 'vue.settings', 'vue.single-file-component'],
        output: ['test', 'vue', 'integration', 'output'],
        createdFiles: ['simplest.vue']
    };

    cardTests.run(context);

});