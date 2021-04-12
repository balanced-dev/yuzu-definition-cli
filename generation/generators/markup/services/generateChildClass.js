const Inflector = require('inflector-js');

const generateChildClass = function(classArray, styleSettings) {
    let lastSection = classArray[classArray.length - 1],
        childClass = '';

    childClass = Inflector.singularize(lastSection) !== lastSection ? Inflector.singularize(lastSection) : styleSettings.backupRefArrayChildClass;
    classArray.push(childClass);
    return classArray;
};

module.exports = generateChildClass;