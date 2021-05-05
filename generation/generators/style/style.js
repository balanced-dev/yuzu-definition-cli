const _ = require('lodash');
const buildScssJsonRepresentation = require('./services/buildScssJsonRepresentation');
const getClassesFromHtml = require('./services/getClassesFromHtml');
const generateCss = require('./services/generateCss');
    
const classAttributeStart = 'class="';

const run = function(styles, cardSettings, html, config) {
    const classArray = getClassesFromHtml.run(html, classAttributeStart);
    const insertPositionText = '/* YUZU STYLE */';
    const insertPosition = styles.lastIndexOf(insertPositionText);
    const stylesheetContent = generateCss.run('', classArray, config);

    // Insert content into stylesheet, replacing indicator comment
    styles = styles.substr(0, insertPosition) + stylesheetContent + styles.substr(insertPosition + insertPositionText.length);

    return styles;
};

module.exports = {run};