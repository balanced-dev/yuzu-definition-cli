const removeClassAttributeStart = require('./removeClassAttributeStart');

const run = function(html, baseClass, classAttributeStart, settings) {
    let pattern = `${classAttributeStart}([a-z-_A-Z])*`,
        regex = new RegExp(pattern,"g"),
        classes = html.match(regex);

    classes = removeClassAttributeStart.run(classes, baseClass, classAttributeStart, settings);
    return classes
};

module.exports = {run};