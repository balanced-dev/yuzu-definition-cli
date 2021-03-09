const _ = require('lodash'),
    buildSassJsonRepresentation = require('./services/buildSassJsonRepresentation'),
    getClassesFromHtml = require('./services/getClassesFromHtml'),
    generateScss = require('./services/generateScss');
    
var classAttributeStart = 'class="';

const run = function(scss, cardSettings, html, config) {
    var classArray = getClassesFromHtml.run(html, cardSettings.className, classAttributeStart, config),
        objRepresentation = buildSassJsonRepresentation.run(classArray, config),
        insertPosition = scss.lastIndexOf('}'),
        scssContent = generateScss.run('', objRepresentation, config);

    // Insert content into markup, before last closing brace
    scss = scss.substr(0, insertPosition) + scssContent + scss.substr(insertPosition);

    return scss;
};

module.exports = {run};

