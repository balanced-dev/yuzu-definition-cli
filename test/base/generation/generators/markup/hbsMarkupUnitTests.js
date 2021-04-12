const config = require('../../../../../config/defaults/hbs');
const fragments = config.markup.fragments;
const wrapperMarkupFragments = fragments.wrapperMarkupFragments;
const contentMarkupFragments = fragments.contentMarkupFragments;
const dataStructureMarkupFragments = fragments.dataStructureMarkupFragments;

const generateOptions = function(propertyNames, classNames = propertyNames) {
    return {
        className: 'test-block',
        absolutePath: propertyNames,
        relativePath: propertyNames,
        cardSettings: {
            className: 'test-block'
        },
        classArray: classNames,
    };
}

describe('Hbs Markup unit tests', function() {

	it('Creates data structure array markup', function() {
        let settings = {...config,  ...generateOptions(['links'])};

        let expectedOpeningHtml =
            `{{#if links.[0]}}\n` +
                `<div class="test-block__links">\n` +
                    `{{#each links}}\n`
        ;
        let expectedClosingHtml =
                        `{{/each}}\n` +
                    `</div>\n` +
            `{{/if}}\n`
        ;

        let opening = wrapperMarkupFragments.array.dataStructuresOpening(settings);
        let closing = wrapperMarkupFragments.array.dataStructuresClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates dynamic refs array markup', function() {
        let settings = {...config,  ...generateOptions(['rows'])};

        let expectedOpeningHtml =
            `{{#if rows.[0]}}\n` +
                `<div class="test-block__rows">\n` +
                    `{{#each rows}}\n` +
                        `<div class="test-block__rows__row">\n`
        ;
        let expectedClosingHtml =
                        `</div>\n` +                        
                    `{{/each}}\n` +
                `</div>\n` +
            `{{/if}}\n`;
        ;

        let opening = wrapperMarkupFragments.array.dynamicRefsOpening(settings);
        let closing = wrapperMarkupFragments.array.dynamicRefsClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates refs array markup', function() {
        let settings = {...config,  ...generateOptions(['links'])};

        let expectedOpeningHtml =
            `{{#if links.[0]}}\n` +
                `<div class="test-block__links">\n` +
                    `{{#each links}}\n`
        ;
        let expectedClosingHtml =
                        `{{/each}}\n` +
                    `</div>\n` +
            `{{/if}}\n`
        ;

        let opening = wrapperMarkupFragments.array.refsOpening(settings);
        let closing = wrapperMarkupFragments.array.refsClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates simple array markup', function() {
        let settings = {...config,  ...generateOptions(['strings'])};

        let expectedOpeningHtml =
            `{{#if strings.[0]}}\n` +
                `<div class="test-block__strings">\n` +
                    `{{#each strings}}\n`
        ;
        let expectedClosingHtml =
                        `{{/each}}\n` +
                    `</div>\n` +
            `{{/if}}\n`
        ;

        let opening = wrapperMarkupFragments.array.simpleTypeOpening(settings);
        let closing = wrapperMarkupFragments.array.simpleTypeClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates parent wrapper array markup', function() {
        let settings = {...config,  ...generateOptions(['objects'])};

        let expectedOpeningHtml =
            `{{#if objects.[0]}}\n` +
                `<div class="test-block__objects">\n` +
                    `{{#each objects}}\n` +
                        `<div class="test-block__objects__object">\n`
        ;
        let expectedClosingHtml =
                        `</div>\n` +                        
                    `{{/each}}\n` +
                `</div>\n` +
            `{{/if}}\n`;
        ;

        let opening = wrapperMarkupFragments.array.parentWrapperOpening(settings);
        let closing = wrapperMarkupFragments.array.parentWrapperClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Fallsback to using "item" when array name is impossible to "singularise" property name', function() {
        let settings = {...config,  ...generateOptions(['stringArray'], ['string-array'])};

        let expectedOpeningHtml =
            `{{#if stringArray.[0]}}\n` +
                `<div class="test-block__string-array">\n` +
                    `{{#each stringArray}}\n` +
                        `<div class="test-block__string-array__item">\n`
        ;
        let expectedClosingHtml =
                        `</div>\n` +                        
                    `{{/each}}\n` +
                `</div>\n` +
            `{{/if}}\n`;
        ;

        let opening = wrapperMarkupFragments.array.parentWrapperOpening(settings);
        let closing = wrapperMarkupFragments.array.parentWrapperClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates object warpper markup', function() {
        let settings = {...config,  ...generateOptions(['person'])};

        let expectedOpeningHtml =
            `<div class="test-block__person">\n`
        ;
        let expectedClosingHtml =
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.object.openingTag(settings);
        let closing = wrapperMarkupFragments.object.closingTag(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates dynamic sub-block array child markup', function() {
        let settings = {...config,  ...generateOptions(['item'])};

        let expectedOutputHtml =
            `{{{ dynPartial _ref item }}}\n`
        ;

        let output = contentMarkupFragments.dynamicSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates named sub-block array child markup', function() {
        let options = {...generateOptions(['this']), ...{value: 'parTeamMember'}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `{{> parTeamMember this }}\n`
        ;

        let output = contentMarkupFragments.namedSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates sub-block property markup', function() {
        let options = {...generateOptions(['footer']), ...{value: 'parSiteFooter'}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `{{#if footer}}\n` +
                `<div class="test-block__footer">\n` +
                    `{{> parSiteFooter footer }}\n` +
                `</div>\n` +
            `{{/if}}\n`
        ;

        let output = contentMarkupFragments.subBlockObject(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates default property markup', function() {
        let settings = {...config,  ...generateOptions(['name'])};

        let expectedOutputHtml =
            `{{#if name}}\n` +
                `<div class="test-block__name">\n` +
                `{{name}}\n` +
                `</div>\n` +
            `{{/if}}\n`
        ;

        let output = contentMarkupFragments.default(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates image data structure markup', function() {
        let settings = {...config,  ...generateOptions(['image'])};

        let expectedOutputHtml =
            `{{#if image.src}}\n` +
                `<picture class="test-block__image">\n` +
                    `<img src="{{image.src}}" alt="{{image.alt}}">\n` +
                `</picture>\n` +
            `{{/if}}\n`
        ;

        let output = dataStructureMarkupFragments.dataImage(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates link data structure markup', function() {
        let settings = {...config,  ...generateOptions(['link'])};

        let expectedOutputHtml =
            `{{#if link.href}}\n` +
                `<a class="test-block__link" href="{{link.href}}" title="{{link.title}}" {{#if link.isNewTab}}target="_blank"{{/if}} {{#if link.isExternalLink}}rel="noopener noreferrer"{{/if}}>\n` +
                    `{{link.label}}\n` +
                `</a>\n` +
            `{{/if}}\n`
        ;

        let output = dataStructureMarkupFragments.dataLink(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates form data structure markup', function() {
        let settings = {...config,  ...generateOptions(['contact', 'form'])};

        let expectedOutputHtml =
            `{{#if contact.form}}\n` +
                `<div class="test-block__contact__form">\n` +
                    `{{!-- {{> parForm contact.form }} --}}\n` +
                `</div>\n` +
            `{{/if}}\n`
        ;

        let output = dataStructureMarkupFragments.dataForm(settings);

        output.should.equal(expectedOutputHtml);
    });

});