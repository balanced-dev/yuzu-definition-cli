const should = require('should');
const base = require('./base')(['yuzu', 'bem.scss', 'hbs.settings']);


const formatHtmlArray = function(lines) {
    return lines.join('\n') + '\n';
};

const initialStyle = function() {
    return base.settings.style.settings.initialStyle(base.settings);
}

const expectedScssStylesheetContent = function(stylesheetContent) {
    let styles = initialStyle();
    const insertPositionText = '/* YUZU STYLE */';
    const insertPosition = styles.lastIndexOf(insertPositionText);

    // Insert content into stylesheet, replacing indicator comment
    return styles.substr(0, insertPosition) + stylesheetContent + styles.substr(insertPosition + insertPositionText.length);
}

const formatScss = function(start, lines) {
    let returnString = start,
        lineIndent = '',
        indentChars = ' '.repeat(base.settings.markup.settings.indentSize);

    lines.forEach(line => {
        lineIndent = line[1] ? indentChars.repeat(line[1]) : indentChars;
        returnString += lineIndent + line[0] + '\n'
    });

    returnString += '}';

    return returnString;
};

describe('bem scss unit', function() {

    describe('scss integration', function() {

        it('Creates simple, single property stylesheeet', function() {
            base.mockGeneralSettings();

            var html = [
                `{{#if text}}`,
                    `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__text">`,
                        `{{text}}`,
                    `</${base.settings.markup.settings.defaultTag}>`,
                `{{/if}}`
            ];

            var expectedScss = expectedScssStylesheetContent(
                `&__text {\n\n`+

                `}\n`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedScss);
        });

        it('Creates nested stylesheeet', function() {
            base.mockGeneralSettings();

            var html = [
                `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj">`,
                    `{{#if obj.text}}`,
                        `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj__text">`,
                            `{{text}}`,
                        `</${base.settings.markup.settings.defaultTag}>`,
                    `{{/if}}`,
                `</${base.settings.markup.settings.defaultTag}>`
            ];

            var expectedScss = expectedScssStylesheetContent(
                `&__obj {\n\n`+

                    `&__text {\n\n`+

                    `}\n`+
                `}\n`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedScss);
        });

        it("Doesn't pollute class name", function() {
            base.mockGeneralSettings();

            var html = [
                `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj {{#each _modifiers}} {{this}}{{/each}}">`
            ];

            var expectedScss = expectedScssStylesheetContent(
                `&__obj {\n\n`+

                `}\n`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedScss);
        });

        it("Doesn't include all classes on element (just first)", function() {
            base.mockGeneralSettings();

            var html = [
                `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj-test box additional-class">`
            ];

            var expectedScss = expectedScssStylesheetContent(
                `&__obj-test {\n\n`+

                `}\n`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedScss);
        });

    })
});