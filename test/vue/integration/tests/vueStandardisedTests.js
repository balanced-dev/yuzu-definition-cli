const tests = require('../../../testIndex');

describe('vue integration', function() {

    const createExpected = true;

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
<<<<<<< HEAD:test/vue/integration/tests/vueLayoutTests.js
            modules: ['scss', 'vue.settings'],
            output: ['test', 'vue', 'integration', 'output', 'normal'],
            createdFiles: ['simplest.html', '_simplest.scss', 'simplest.js']
=======
            modules: ['bem.scss', 'vue.settings'],
            output: ['test', 'vue', 'integration', 'output', 'normal'],
            createdFiles: ['simplest.html', '_simplest.scss', 'simplest.js', 'simplest.schema']
>>>>>>> 47c61ddcaca59073a7a69b582de96e91dd468e5e:test/vue/integration/tests/vueStandardisedTests.js
        };

        cardTests.run(context);
    });

});