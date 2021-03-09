const rewire = require('rewire'), 
    svc = rewire('../../../../generation/generators/scss/scss.js');

const mockupSettings = {
    className: 'test-block',
    markupSettings: {
        defaultMarkupTag: 'div',
        classNameDivider: '__',
        indentSize: 4,
        backupRefArrayChildClass: 'item'
    }
};

const defaultClassName = 'test-block',
    defaultScssStart = `.${defaultClassName} {\n\n`;

const output = {  
    svc: svc,  
    settings: mockupSettings,
    mockSettings: function() {
        svc.__set__({
            settings: mockupSettings
        });
    },
    cardSettings: {
        className: defaultClassName
    },
    scssStart: defaultScssStart
};

module.exports = output;