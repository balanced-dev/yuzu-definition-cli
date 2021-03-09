const Inflector = require('inflector-js');

const generateChildClass = function(classArray, markupSettings) {
    let lastSection = classArray[classArray.length - 1],
        childClass = '';

    childClass = Inflector.singularize(lastSection) !== lastSection ? Inflector.singularize(lastSection) : markupSettings.backupRefArrayChildClass;
    classArray.push(childClass);
    return classArray;
};

module.exports = generateChildClass;