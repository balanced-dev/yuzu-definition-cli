const rewire = require('rewire'), 
    generateChildClass = rewire('../../../../generation/generators/markup/services/generateChildClass.js'),
    svc = rewire('../../../../generation/generators/markup/markup'),
    _ = require('lodash');

const output = (type) => {

    const typeSettings = require('../../../../config/defaults/'+ type);

    const mockupSettings = {
        className: 'test-block',
        markup: '', 
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