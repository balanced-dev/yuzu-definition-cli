const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = true;

    describe('single-file', function() {

        const cardTests = tests.cardTests('vue', createExpected);

        let context = {
            name: 'single-file',
            modules: ['scss', 'vue.settings', 'vue.single-file-component'],
            output: ['test', 'vue', 'integration', 'output', 'single-file'],
            createdFiles: ['simplest.vue']
        };

        cardTests.run(context);
    });

    describe('normal', function() {

        const cardTests = tests.cardTests('html', createExpected);

        let context = {
            name: 'normal',
            modules: ['scss', 'vue.settings'],
            output: ['test', 'vue', 'integration', 'output', 'normal'],
            createdFiles: ['simplest.html', '_simplest.scss', 'simplest.js']
        };

        cardTests.run(context);
    });

});