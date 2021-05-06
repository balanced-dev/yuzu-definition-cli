const appendChildContextClass = function(options) {
    let lastSection = options.classArray[options.classArray.length - 1],
        childClass = '';

    childClass = options.plugins.inflector.singularize(lastSection) !== lastSection ? options.plugins.inflector.singularize(lastSection) : options.style.settings.backupRefArrayChildClass;
    options.classArray.push(childClass);
}; 

const generateClassString = function(options) {
    let className = '' + options.cardSettings.className;

    options.classArray.forEach(property => {
        className += options.style.settings.classNameDivider + options.plugins.changeCase.paramCase(property);
    });

    return className;
};

module.exports = {generateClassString, appendChildContextClass};