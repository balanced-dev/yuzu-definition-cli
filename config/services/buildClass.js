const changeCase = require("change-case");
const inflector = require("inflector-js");

const appendChildContextClass = function(options) {
    let lastSection = options.classArray[options.classArray.length - 1],
        childClass = '';

    childClass = inflector.singularize(lastSection) !== lastSection ? inflector.singularize(lastSection) : options.style.settings.backupRefArrayChildClass;
    options.classArray.push(childClass);
}; 

const generateClassString = function(options) {
    let className = '' + options.cardSettings.className;

    options.classArray.forEach(property => {
        className += options.style.settings.classNameDivider + changeCase.paramCase(property);
    });

    return className;
};

module.exports = {generateClassString, appendChildContextClass};