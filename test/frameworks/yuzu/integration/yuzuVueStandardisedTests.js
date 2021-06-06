const tests = require('../../../testIndex');

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

describe('yuzu integration', function() {

    const createExpected = false;
    const cardTests = tests.cardTests('vue', createExpected);

    describe('vue', function() {

        const context = {
            modules: ['schema', 'scss.bem', 'vue.settings', 'vue.single-file-component', 'vue.prettier', 'yuzu', 'yuzu.vue'],
            output: ['test', 'frameworks', 'yuzu', 'integration', 'output', 'vue'],
            createdFiles: ['data\\parSimplest.json', 'parSimplest.vue', 'parSimplest.schema'],
            parseFilename: (testTitle) => {
                return `par${capitalize(testTitle)}`;
            }
        };

        cardTests.run(context);
    });

});