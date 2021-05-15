const buildScssJsonRepresentation = require('../../../generation/generators/style/services/buildScssJsonRepresentation');
const getClassesFromHtml = require('../../../generation/generators/style/services/getClassesFromHtml');
const generateScss = require('../../../generation/generators/style/services/generateScss');
    
const classAttributeStart = 'class="';

const run = function(styles, cardSettings, html, config) {
    const classAttribute = classAttributeStart + cardSettings.className + config.style.settings.classNameDivider;
    let classArray = getClassesFromHtml.run(html, classAttribute);

    let objRepresentation = buildScssJsonRepresentation.run(classArray, config);
    const insertPositionText = '/* YUZU STYLE */';
    const insertPosition = styles.lastIndexOf(insertPositionText);
    let stylesheetContent = generateScss.run('', objRepresentation, config);

    // Insert content into stylesheet, replacing indicator comment
    styles = styles.substr(0, insertPosition) + stylesheetContent + styles.substr(insertPosition + insertPositionText.length);

    return styles;
};

module.exports = {run};