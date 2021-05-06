const removeClassAttributeStart = require('./removeClassAttributeStart');

const run = function(html, classAttributeStart) {
    const pattern = `${classAttributeStart}([a-z-_A-Z])*`;
    const regex = new RegExp(pattern,"g");
    let classes = html.match(regex);

    classes = removeClassAttributeStart.run(classes, classAttributeStart);
    return classes;
};

module.exports = {run};