const propertyTypes = {
    array: {
        defaultValue: function() {
            return [{}];
        }
    },
    object: {
        defaultValue: function() {
            return {};
        }
    },
    boolean: {
        defaultValue: function() {
            return true;
        }
    },
    integer: {
        defaultValue: function() {
            return 0;
        }
    },
    number: {
        defaultValue: function() {
            return 0.1;
        }
    },
    string: {
        defaultValue: function() {
            return '';
        }
    },
    integerArray: {
        defaultValue: function() {
            return [0];
        }
    },
    numberArray: {
        defaultValue: function() {
            return [0.1];
        }
    },
    stringArray: {
        defaultValue: function() {
            return [''];
        }
    },
    subBlock: {
        defaultValue: function(subBlockName){
            return {'$ref': '/' + subBlockName};
        }
    }
};

module.exports = propertyTypes;