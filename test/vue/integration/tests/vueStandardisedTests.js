const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = false;

    describe('single-file', function() {

        const cardTests = tests.cardTests('vue', createExpected);

        let context = {
            name: 'single-file',
            modules: ['bem.scss', 'vue.settings', 'vue.single-file-component'],
            output: ['test', 'vue', 'integration', 'output', 'singleFile'],
            createdFiles: ['simplest.vue']
        };

        cardTests.run(context);
    });

    describe('normal', function() {

        const cardTests = tests.cardTests('html', createExpected);

        let context = {
            name: 'normal',
            modules: ['bem.scss', 'vue.settings'],
            output: ['test', 'vue', 'integration', 'output', 'normal'],
            createdFiles: ['simplest.html', '_simplest.scss', 'simplest.js', 'simplest.schema']
        };

        cardTests.run(context);
    });

});