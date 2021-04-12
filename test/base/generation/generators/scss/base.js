const rewire = require('rewire'), 
    svc = rewire('../../../../../generation/generators/scss/scss.js');

const mockupSettings = {
    className: 'test-block',
    markup: {
        settings: {
            defaultTag: 'div',
            indentSize: 4,
        }
    },
    style: {
        settings: {
            classNameDivider: '__',
            backupRefArrayChildClass: 'item'
        }
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