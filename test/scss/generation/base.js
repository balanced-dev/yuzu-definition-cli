const rewire = require('rewire'),
    svc = rewire('../../../generation/generators/style/style'),
    _ = require('lodash');

const output = (modules) => {

    const typeSettings = require('../../../config/configFactory').createForTesting({ modules: modules });

    const mockupSettings = {
        className: 'test-block',
        cardSettings: {
            className: 'test-block'
        },
    };
    
    const settings = { ...typeSettings,  ...mockupSettings};

    return {
        svc: settings.generators.style,
        settings: settings,
        mockGeneralSettings: function() {
        },
        scssStart: `.${settings.className} {\n\n`,
    }

};

module.exports = output;