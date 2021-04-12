const run = function(classes, baseClass, classAttribute, settings) {
    classes.forEach(function(cssClass, index) {
        classes[index] = cssClass.replace(classAttribute + baseClass + settings.style.settings.classNameDivider, '');
    });
    return classes;
};

module.exports = {run};