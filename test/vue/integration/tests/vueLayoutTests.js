const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = false;

    describe('single-file', function() {

        const cardTests = tests.cardTests('vue', createExpected);

        let context = {
            name: 'single-file',
            modules: ['scss', 'vue.settings', 'vue.single-file-component'],
            output: ['test', 'vue', 'integration', 'output'],
            createdFiles: ['simplest.vue']
        };

        cardTests.run(context);
    });

    describe('normal', function() {

        const cardTests = tests.cardTests('vue', createExpected);

        let context = {
            name: 'normal',
            modules: ['scss', 'vue.settings'],
            createdFiles: ['simplest.html', '_simplest.scss', 'simplest.js', 'simplest.schema']
        };

        cardTests.run(context);
    });

});