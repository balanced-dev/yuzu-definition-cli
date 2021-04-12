const should = require('should'),
    rewire = require('rewire'),
    svc = rewire('../../../../../generation/generators/scss/scss.js'),
    base = require('./base.js');


const formatHtmlArray = function(lines) {
    return lines.join('\n') + '\n';
};

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

describe('Scss service integration tests', function() {

	it('Creates simple, single property stylesheeet', function() {
        base.mockSettings();

        var html = [
            `{{#if text}}`,
                `<${base.settings.markup.settings.defaultTag} class="${base.cardSettings.className}__text">`,
                    `{{text}}`,
                `</${base.settings.markup.settings.defaultTag}>`,
            `{{/if}}`
        ];

        var expectedScss = `${base.scssStart}&__text {\n }}`;

        var output = base.svc.run(base.scssStart + '}', base.cardSettings, formatHtmlArray(html), base.settings);

        output.should.equal(expectedScss);
    });

	it('Creates nested stylesheeet', function() {
        base.mockSettings();

        var html = [
            `<${base.settings.markup.settings.defaultTag} class="${base.cardSettings.className}__obj">`,
                `{{#if obj.text}}`,
                    `<${base.settings.markup.settings.defaultTag} class="${base.cardSettings.className}__obj__text">`,
                        `{{text}}`,
                    `</${base.settings.markup.settings.defaultTag}>`,
                `{{/if}}`,
            `</${base.settings.markup.settings.defaultTag}>`
        ];

        var expectedScss = `${base.scssStart}&__obj {\n \n &__text {\n }}}`;

        var output = base.svc.run(base.scssStart + '}', base.cardSettings, formatHtmlArray(html), base.settings);

        output.should.equal(expectedScss);
    });

	it("Doesn't pollute class name", function() {
        base.mockSettings();

        var html = [
            `<${base.settings.markup.settings.defaultTag} class="${base.cardSettings.className}__obj {{#each _modifiers}} {{this}}{{/each}}">`
        ];

        var expectedScss = `${base.scssStart}&__obj {\n }}`;

        var output = base.svc.run(base.scssStart + '}', base.cardSettings, formatHtmlArray(html), base.settings);

        output.should.equal(expectedScss);
    });

	it("Doesn't include all classes on element (just first)", function() {
        base.mockSettings();

        var html = [
            `<${base.settings.markup.settings.defaultTag} class="${base.cardSettings.className}__obj-test box additional-class">`
        ];

        var expectedScss = `${base.scssStart}&__obj-test {\n }}`;

        var output = base.svc.run(base.scssStart + '}', base.cardSettings, formatHtmlArray(html), base.settings);

        output.should.equal(expectedScss);
    });

});