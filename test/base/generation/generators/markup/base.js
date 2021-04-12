const rewire = require('rewire'), 
    generateChildClass = rewire('../../../../../generation/generators/markup/services/generateChildClass.js'),
    svc = rewire('../../../../../generation/generators/markup/markup'),
    _ = require('lodash');

const output = (modules) => {

    const typeSettings = require('../../../../../config/configFactory').createForTesting({ modules: ['yuzu', 'scss', 'vue.settings'] });

    const mockupSettings = {
        className: 'test-block',
        output: '', 
        cardSettings: {
            className: 'test-block'
        },
        data: {},
        absolutePath: [],
        relativePath: [],
        classArray: [],
    };
    
    const settings = { ...typeSettings,  ...mockupSettings};

    return {
        svc: svc,
        generateChildClassSvc: generateChildClass,
        settings: settings,
        mockGeneralSettings: function() {
            svc.__set__({
                settings: settings,
            });
            generateChildClass.__set__({
                settings: settings
            });
        },
    }

};

module.exports = output;