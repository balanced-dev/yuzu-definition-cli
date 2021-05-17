const should = require('should');
const base = require('../../../base/generation/generators/markup/base')(['hbs.settings']);

const formatHtmlArray = function(lines) {
    return lines.join('\n') + '\n';
};

const removeMultipleSpaces = function(str) {
    return str.replace(/  +/g, '');
};

const mockupAll = function() {
    base.mockGeneralSettings();
    // base.mockMarkup();
};

describe('hbs unit', function() {
    describe('markup service integration tests', function() {

        it('Creates simple property markup', function() {
            mockupAll();

            let json = {
                text: ""
            };

            let expectedHtml = [
                `{{#if text}}`,
                    `<div class="test-block__text">`,
                        `{{text}}`,
                    `</div>`,
                `{{/if}}`
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates nested property markup', function() {
            mockupAll();

            let json = {
                author: {
                    id: "",
                    link: {
                        text: "",
                        href: ""
                    }
                }
            };

            let expectedHtml = [
                `<div class="test-block__author">`,
                    `{{#if author.id}}`,
                        `<div class="test-block__author__id">`,
                            `{{author.id}}`,
                        `</div>`,
                    `{{/if}}`,
                    `<div class="test-block__author__link">`,
                        `{{#if author.link.text}}`,
                            `<div class="test-block__author__link__text">`,
                                `{{author.link.text}}`,
                            `</div>`,
                        `{{/if}}`,
                        `{{#if author.link.href}}`,
                            `<div class="test-block__author__link__href">`,
                                `{{author.link.href}}`,
                            `</div>`,
                        `{{/if}}`,
                    `</div>`,
                `</div>`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates array markup', function() {
            mockupAll();

            let json = {
                authors: [
                    {
                        articles: [
                            {
                                title: ""
                            }
                        ],
                        name: ""
                    }
                ]
            };

            let expectedHtml = [
                `{{#if authors.[0]}}`, 
                    `<div class="test-block__authors">`,
                        `{{#each authors}}`,
                            `<div class="test-block__authors__author">`,
                                `{{#if articles.[0]}}`,          
                                    `<div class="test-block__authors__author__articles">`,
                                        `{{#each articles}}`,
                                            `{{#if title}}`,
                                                `<div class="test-block__authors__author__articles__title">`,
                                                    `{{title}}`,
                                                `</div>`,
                                            `{{/if}}`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if name}}`,
                                    `<div class="test-block__authors__author__name">`,
                                        `{{name}}`,
                                    `</div>`,
                                `{{/if}}`,  
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates un-nested, single property array markup', function() {
            mockupAll();

            let json = {
                authors: [
                    {
                        name: ""
                    }
                ]
            };

            let expectedHtml = [
                `{{#if authors.[0]}}`, 
                    `<div class="test-block__authors">`,
                        `{{#each authors}}`,
                            `{{#if name}}`,
                                `<div class="test-block__authors__name">`,
                                    `{{name}}`,
                                `</div>`,
                            `{{/if}}`,  
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates nested, single property array markup', function() {
            mockupAll();

            let json = {
                authors: [
                    {
                        books: [
                            {
                                name: ""
                            }
                        ]
                    }
                ]
            };

            let expectedHtml = [
                `{{#if authors.[0]}}`, 
                    `<div class="test-block__authors">`,
                        `{{#each authors}}`,
                            `{{#if books.[0]}}`, 
                                `<div class="test-block__authors__books">`,
                                    `{{#each books}}`,
                                        `{{#if name}}`,
                                            `<div class="test-block__authors__books__name">`,
                                                `{{name}}`,
                                            `</div>`,
                                        `{{/if}}`,  
                                    `{{/each}}`,
                                `</div>`,
                            `{{/if}}`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates anyOf sub-block markup', function() {
            mockupAll();

            let json = {
                authors: [
                    {
                        $ref: "/parBasicAuthorProfile"
                    },
                    {
                        $ref: "/parComplexAuthorProfile"
                    }
                ]
            };

            let expectedHtml = [
                `{{#if authors.[0]}}`, 
                    `<div class="test-block__authors">`,
                        `{{#each authors}}`,       
                            `<div class="test-block__authors__author">`,
                                `{{{ dynPartial _ref this }}}`,
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates sub-block markup', function() {
            mockupAll();

            let json = {
                authors: [
                    {
                        articles: [
                            {
                                $ref: "/parArticle"
                            }
                        ],
                        info: {
                            $ref: "/parAuthor"
                        },                    
                        images: [
                            {
                                thumbnail: {
                                    $ref: "/parImage"
                                }
                            }
                        ],
                        linkList: [
                            {
                                $ref: "/parLink"
                            }
                        ]
                    }
                ]
            };

            let expectedHtml = [
                `{{#if authors.[0]}}`, 
                    `<div class="test-block__authors">`,
                        `{{#each authors}}`,       
                            `<div class="test-block__authors__author">`,
                                `{{#if articles.[0]}}`,       
                                    `<div class="test-block__authors__author__articles">`,
                                        `{{#each articles}}`,
                                            `<div class="test-block__authors__author__articles__article">`,
                                                `{{> parArticle this }}`,
                                            `</div>`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if info}}`,
                                    `<div class="test-block__authors__author__info">`,
                                        `{{> parAuthor info }}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if images.[0]}}`, 
                                    `<div class="test-block__authors__author__images">`,
                                        `{{#each images}}`,
                                            `{{#if thumbnail}}`,
                                                `<div class="test-block__authors__author__images__thumbnail">`,
                                                    `{{> parImage thumbnail }}`,
                                                `</div>`,
                                            `{{/if}}`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if linkList.[0]}}`,
                                    `<div class="test-block__authors__author__link-list">`,
                                        `{{#each linkList}}`,
                                            `<div class="test-block__authors__author__link-list__item">`,
                                                `{{> parLink this }}`,
                                            `</div>`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates data structure sub-block markup', function() {
            mockupAll();

            let json = {
                "logo": {
                    "$ref": "/dataImage"
                },
                "contactDetails": [
                    {
                        "icon": {
                            "$ref": "/dataImage"
                        },
                        "link": {
                            "$ref": "/dataLink"
                        }
                    }
                ],
                "socialLinks": [
                    {
                        "link": {
                            "$ref": "/dataLink"
                        },
                        "icon": {
                            "$ref": "/dataImage"
                        }
                    }
                ],
                "links": [
                    {
                        "$ref": "/dataLink"
                    }
                ]
            };

            let expectedHtml = [
                `{{#if logo.src}}`,
                    `<picture class="test-block__logo">`,
                        `<img src="{{logo.src}}" alt="{{logo.alt}}">`,
                    `</picture>`,
                `{{/if}}`,
                `{{#if contactDetails.[0]}}`,
                    `<div class="test-block__contact-details">`,
                        `{{#each contactDetails}}`,
                            `<div class="test-block__contact-details__contact-detail">`,
                                `{{#if icon.src}}`,
                                    `<picture class="test-block__contact-details__contact-detail__icon">`,
                                        `<img src="{{icon.src}}" alt="{{icon.alt}}">`,
                                    `</picture>`,
                                `{{/if}}`,
                                `{{#if link.href}}`,
                                    `<a class="test-block__contact-details__contact-detail__link" href="{{link.href}}" title="{{link.title}}" {{#if link.isNewTab}}target="_blank"{{/if}} {{#if link.isExternalLink}}rel="noopener noreferrer"{{/if}}>`,
                                        `{{link.label}}`,
                                    `</a>`,
                                `{{/if}}`,
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
                `{{#if socialLinks.[0]}}`,
                    `<div class="test-block__social-links">`,
                        `{{#each socialLinks}}`,
                            `<div class="test-block__social-links__social-link">`,
                                `{{#if link.href}}`,
                                    `<a class="test-block__social-links__social-link__link" href="{{link.href}}" title="{{link.title}}" {{#if link.isNewTab}}target="_blank"{{/if}} {{#if link.isExternalLink}}rel="noopener noreferrer"{{/if}}>`,
                                        `{{link.label}}`,
                                    `</a>`,
                                `{{/if}}`,
                                `{{#if icon.src}}`,
                                    `<picture class="test-block__social-links__social-link__icon">`,
                                        `<img src="{{icon.src}}" alt="{{icon.alt}}">`,
                                    `</picture>`,
                                `{{/if}}`,
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
                `{{#if links.[0]}}`,
                    `<div class="test-block__links">`,
                        `{{#each links}}`,
                            `{{#if this.href}}`,
                                `<a class="test-block__links__link" href="{{this.href}}" title="{{this.title}}" {{#if this.isNewTab}}target="_blank"{{/if}} {{#if this.isExternalLink}}rel="noopener noreferrer"{{/if}}>`,
                                    `{{this.label}}`,
                                `</a>`,
                            `{{/if}}`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

        it('Creates different array type markup', function() {
            mockupAll();

            let json = {
                "arrayName": [""],
                "containingArray": [
                    {
                        "numberList": [0.1],
                        "integerList": [0],
                        "stringList": [""]
                    }
                ]
            };

            let expectedHtml = [
                `{{#if arrayName.[0]}}`,
                    `<div class="test-block__array-name">`,
                        `{{#each arrayName}}`,
                            `{{#if this}}`,
                                `<div class="test-block__array-name__item">`,
                                    `{{this}}`,
                                `</div>`,
                            `{{/if}}`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
                `{{#if containingArray.[0]}}`,
                    `<div class="test-block__containing-array">`,
                        `{{#each containingArray}}`,
                            `<div class="test-block__containing-array__item">`,
                                `{{#if numberList.[0]}}`,
                                    `<div class="test-block__containing-array__item__number-list">`,
                                        `{{#each numberList}}`,
                                            `{{#if this}}`,
                                                `<div class="test-block__containing-array__item__number-list__item">`,
                                                    `{{this}}`,
                                                `</div>`,
                                            `{{/if}}`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if integerList.[0]}}`,
                                    `<div class="test-block__containing-array__item__integer-list">`,
                                        `{{#each integerList}}`,
                                            `{{#if this}}`,
                                                `<div class="test-block__containing-array__item__integer-list__item">`,
                                                    `{{this}}`,
                                                `</div>`,
                                            `{{/if}}`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                                `{{#if stringList.[0]}}`,
                                    `<div class="test-block__containing-array__item__string-list">`,
                                        `{{#each stringList}}`,
                                            `{{#if this}}`,
                                                `<div class="test-block__containing-array__item__string-list__item">`,
                                                    `{{this}}`,
                                                `</div>`,
                                            `{{/if}}`,
                                        `{{/each}}`,
                                    `</div>`,
                                `{{/if}}`,
                            `</div>`,
                        `{{/each}}`,
                    `</div>`,
                `{{/if}}`,
            ];

            let output = base.svc.generateMarkup({ ...base.settings, ...{ data: json}});
            output = removeMultipleSpaces(output);

            output.should.equal(formatHtmlArray(expectedHtml));
        });

    });
});