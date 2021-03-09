const addChildClass = function(options) {
    let lastSection = options.classArray[options.classArray.length - 1],
        childClass = '';

    childClass = options.plugins.inflector.singularize(lastSection) !== lastSection ? options.plugins.inflector.singularize(lastSection) : options.markupSettings.backupRefArrayChildClass;
    options.classArray.push(childClass);
}; 

const run = function(options) {
    let className = '' + options.cardSettings.className;

    options.classArray.forEach(property => {
        className += options.markupSettings.classNameDivider + options.plugins.changeCase.paramCase(property);
    });

    return className;
};

module.exports = {run, addChildClass};