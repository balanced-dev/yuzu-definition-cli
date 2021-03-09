const _ = require('lodash');

const run = function(classArray, settings) {
    let obj = {};

    classArray.forEach(function(cssClass, index) {
        let path = cssClass.split(settings.markupSettings.classNameDivider),
            pathString = '';

        path.forEach(function(pathSegment, index) {
            pathString += pathString !== '' ? '.' + pathSegment : pathSegment;

            if(_.get(obj, pathString, undefined) === undefined) {
                _.set(obj, pathString, {});
            }
        });
    });
    
    return obj;
};

module.exports = {run};