const should = require('should');
const base = require('./base')(['yuzu', 'hbs.settings']);


const formatHtmlArray = function(lines) {
    return lines.join('\n') + '\n';
};

const initialStyle = function() {
    return base.settings.style.settings.initialContent(base.settings);
}

const expectedCssStylesheetContent = function(stylesheetContent) {
    let styles = initialStyle();
    const insertPositionText = '/* YUZU STYLE */';
    const insertPosition = styles.lastIndexOf(insertPositionText);

    // Insert content into stylesheet, replacing indicator comment
    return styles.substr(0, insertPosition) + stylesheetContent + styles.substr(insertPosition + insertPositionText.length);
}

describe('base', function() {

    describe('css service integration tests', function() {

        it('Creates simple, single property stylesheeet', function() {
            base.mockGeneralSettings();

            var html = [
                `{{#if text}}`,
                    `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__text">`,
                        `{{text}}`,
                    `</${base.settings.markup.settings.defaultTag}>`,
                `{{/if}}`
            ];

            var expectedCss = expectedCssStylesheetContent(
                `.${base.settings.className}__text {\n\n`+
                
                `}`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedCss);
        });

        it('Creates nested property stylesheeet', function() {
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

            var expectedCss = expectedCssStylesheetContent(
                `.${base.settings.className}__obj {\n\n`+
                
                `}\n\n`+
                
                `.${base.settings.className}__obj__text {\n\n`+
                
                `}`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedCss);
        });

        it("Doesn't pollute class name", function() {
            base.mockGeneralSettings();

            var html = [
                `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj {{#each _modifiers}} {{this}}{{/each}}">`
            ];

            var expectedCss = expectedCssStylesheetContent(
                `.${base.settings.className}__obj {\n\n`+
                
                `}`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedCss);
        });

        it("Doesn't include all classes on element (just first)", function() {
            base.mockGeneralSettings();

            var html = [
                `<${base.settings.markup.settings.defaultTag} class="${base.settings.cardSettings.className}__obj-test box additional-class">`
            ];

            var expectedCss = expectedCssStylesheetContent(
                `.${base.settings.className}__obj-test {\n\n`+
                
                `}`
            );

            var output = base.svc.run(initialStyle(), base.settings.cardSettings, formatHtmlArray(html), base.settings);

            output.should.equal(expectedCss);
        });

    })
});