const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = false;

    describe('single-file', function() {

        const cardTests = tests.cardTests('vue', createExpected);

        let context = {
            name: 'single-file',
            modules: ['scss.bem', 'vue.settings', 'vue.single-file-component', 'vue.prettier'],
            output: ['test', 'languages', 'vue', 'integration', 'output', 'singleFile'],
            createdFiles: ['simplest.vue']
        };

        cardTests.run(context);
    });

    describe('normal', function() {

        const cardTests = tests.cardTests('html', createExpected);

        let context = {
            name: 'normal',
            modules: ['vue.settings'],
            output: ['test', 'languages', 'vue', 'integration', 'output', 'normal'],
            createdFiles: ['simplest.html', 'simplest.css', 'simplest.js']
        };

        cardTests.run(context);
    });

});