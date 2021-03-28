const userConfig = { modules: ['yuzu','scss','vue.settings'] };
let config = require('../../../../config/configFactory').createForTesting(userConfig);
const fragments = config.markupFragments;
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

describe('Vue Markup unit tests', function() {

    beforeEach(() => {
        config = require('../../../../config/configFactory').createForTesting(userConfig);
    });

	it('Creates data structure array markup', function() {
        let settings = {...config,  ...generateOptions(['links'])};

        let expectedOpeningHtml =
            `<div class="test-block__links" v-if="links && links.length">\n`
        ;
        let expectedClosingHtml =
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.array.dataStructuresOpening(settings);
        let closing = wrapperMarkupFragments.array.dataStructuresClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates dynamic refs array markup', function() {
        let settings = {...config,  ...generateOptions(['rows'])};

        let expectedOpeningHtml =
            `<div class="test-block__rows" v-if="rows && rows.length">\n` +
                `<div class="test-block__rows__row" v-for="(row, index) in rows" :key="index">\n`
        ;
        let expectedClosingHtml =
                `</div>\n`+
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.array.dynamicRefsOpening(settings);
        let closing = wrapperMarkupFragments.array.dynamicRefsClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates refs array markup', function() {
        let settings = {...config,  ...generateOptions(['links'])};

        let expectedOpeningHtml =
            `<div class="test-block__links" v-if="links && links.length">\n`
        ;
        let expectedClosingHtml =
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.array.refsOpening(settings);
        let closing = wrapperMarkupFragments.array.refsClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates simple array markup', function() {
        let settings = {...config,  ...generateOptions(['strings'])};

        let expectedOpeningHtml =
            `<div class="test-block__strings" v-if="strings && strings.length">\n` 
        ;
        let expectedClosingHtml =
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.array.simpleTypeOpening(settings);
        let closing = wrapperMarkupFragments.array.simpleTypeClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Creates parent wrapper array markup', function() {
        let settings = {...config,  ...generateOptions(['objects'])};

        let expectedOpeningHtml =
            `<div class="test-block__objects" v-if="objects && objects.length">\n` +
                `<div class="test-block__objects__object" v-for="(object, index) in objects" :key="index">\n`
        ;
        let expectedClosingHtml =
                `</div>\n`+
            `</div>\n`
        ;

        let opening = wrapperMarkupFragments.array.parentWrapperOpening(settings);
        let closing = wrapperMarkupFragments.array.parentWrapperClosing(settings);

        opening.should.equal(expectedOpeningHtml) && closing.should.equal(expectedClosingHtml);
    });

	it('Fallsback to using "item" when array name is impossible to "singularise" property name', function() {
        let settings = {...config,  ...generateOptions(['stringArray'], ['string-array'])};

        let expectedOpeningHtml =
            `<div class="test-block__string-array" v-if="stringArray && stringArray.length">\n` +
                `<div class="test-block__string-array__item" v-for="(item_${settings.absolutePath.length}, index) in stringArray" :key="index">\n`
        ;
        let expectedClosingHtml =
                `</div>\n`+
            `</div>\n`
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
            `<component :is="item._ref.replace('/par', '')" :key="index" v-bind="item"></component>\n`
        ;

        let output = contentMarkupFragments.dynamicSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates named sub-block array child markup', function() {
        let options = {...generateOptions(['employee']), ...{value: 'parTeamMember', isArray: true, arrayContext: ['employees']}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<team-member v-for=\"(employee, index) in employees\" :key=\"index\" v-bind=\"employee\"></team-member>\n`;

        let output = contentMarkupFragments.namedSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

    it('Creates named sub-block array child in a parent array markup', function() {
        let options = {...generateOptions(['employee']), ...{value: 'parTeamMember', isArray: true, arrayContext: ['staff', 'employees']}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<team-member v-for=\"(employee, index) in staff.employees\" :key=\"index\" v-bind=\"employee\"></team-member>\n`;

        let output = contentMarkupFragments.namedSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

    it('Creates named sub-block child markup', function() {
        let options = {...generateOptions(['employee']), ...{value: 'parTeamMember'}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<team-member v-if=\"employee\" v-bind=\"employee\"></team-member>\n`;

        let output = contentMarkupFragments.namedSubBlockArray(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates sub-block property markup', function() {
        let options = {...generateOptions(['footer']), ...{value: 'parSiteFooter'}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<site-footer v-if="footer" v-bind="footer"></site-footer>\n`
        ;

        let output = contentMarkupFragments.subBlockObject(settings);

        output.should.equal(expectedOutputHtml);
    });

    it('Creates sub-block array property markup', function() {
        let options = {...generateOptions(['footer']), ...{value: 'parSiteFooter', isArray: true, arrayContext: ['footers']}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<site-footer v-for=\"(footer, index) in footers\" :key=\"index\" v-bind="footer"></site-footer>\n`
        ;

        let output = contentMarkupFragments.subBlockObject(settings);

        output.should.equal(expectedOutputHtml);
    });

    it('Creates sub-block array property in parent array markup', function() {
        let options = {...generateOptions(['footer']), ...{value: 'parSiteFooter', isArray: true, arrayContext: ['site', 'footers']}};
        let settings = {...config,  ...options};

        let expectedOutputHtml =
            `<site-footer v-for=\"(footer, index) in site.footers\" :key=\"index\" v-bind="footer"></site-footer>\n`
        ;

        let output = contentMarkupFragments.subBlockObject(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates default property markup', function() {
        let settings = {...config,  ...generateOptions(['name'])};

        let expectedOutputHtml =
            `<div class="test-block__name" v-if="name">\n` +
                `{{name}}\n` +
            `</div>\n`
        ;

        let output = contentMarkupFragments.default(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates image data structure markup', function() {
        let settings = {...config,  ...generateOptions(['image'])};

        let expectedOutputHtml =
            `<picture v-if="image.src" class="test-block__image">\n` +
                `<img :src="image.src" :alt="image.alt">\n` +
            `</picture>\n`;
        ;

        let output = dataStructureMarkupFragments.dataImage(settings);

        output.should.equal(expectedOutputHtml);
    });


    it('Creates link data structure markup', function() {
        let settings = {...config,  ...generateOptions(['link'])};

        let expectedOutputHtml =
            `<a v-if="link.href && link.label" class="test-block__link" :href="link.href" :title="link.title" :target="link.isNewTab ? '_blank' : false" :rel="link.isExternalLink ? 'noopener noreferrer' : false">\n` +
                `{{link.label}}\n` +
            `</a>\n`
        ;

        let output = dataStructureMarkupFragments.dataLink(settings);

        output.should.equal(expectedOutputHtml);
    });

	it('Creates form data structure markup', function() {
        let settings = {...config,  ...generateOptions(['contact', 'form'])};

        let expectedOutputHtml =
            `<!-- Insert contact.form form here -->\n`
        ;

        let output = dataStructureMarkupFragments.dataForm(settings);

        output.should.equal(expectedOutputHtml);
    });

});