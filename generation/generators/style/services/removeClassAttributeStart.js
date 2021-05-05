const run = function(classes, classAttributeStart) {
    classes.forEach(function(cssClass, index) {
        classes[index] = cssClass.replace(classAttributeStart, '');
    });
    return classes;
};

module.exports = {run};