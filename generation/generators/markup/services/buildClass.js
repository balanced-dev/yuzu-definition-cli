const camelCaseToKebabCase = require('./camelCaseToKebabCase');

const run = function(baseClass, classArray, divider) {
    let classAttribute = 'class="' + baseClass;

    classArray.forEach(property => {
        classAttribute += divider + camelCaseToKebabCase.run(property);
    });

    return classAttribute + '"';
};

module.exports = {run};