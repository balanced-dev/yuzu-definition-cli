const should = require('should');
const base = require('../../../base/generation/generators/markup/base')(['yuzu', 'bem.scss', 'vue.settings']);

const formatHtmlArray = function(lines) {
    return lines.join('\n') + '\n';
};

const removeMultipleSpaces = function(str) {
    return str.replace(/  +/g, '');
};

const mockupAll = function() {
    base.mockGeneralSettings();
};

const cleanHtml = function(val) {
    return val.replace(/\n/g, '').replace(/"/g, "'");
}

const actAndAssert = function(data, expectedHtml) {

    let actual = base.svc.generateMarkup({ ...base.settings, ...{data: data}});
    actual = removeMultipleSpaces(actual);
    actual = cleanHtml(actual);

    var expected = formatHtmlArray(expectedHtml);
    expected = cleanHtml(expected);

    actual.should.equal(expected);
}

describe('vue unit', function() {

    describe('markup integration', function() {

        beforeEach(function(){
            mockupAll();
        });

        it('Creates simple property markup', function() {
            let json = {
                text: ""
            };

            let expectedHtml = [
                `<div class="test-block__text" v-if="text">`,
                    `{{text}}`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates nested properties markup', function() {

            let json = {
                author: {
                    id: 2,
                    link: {
                        text: "",
                        href: ""
                    }
                }
            };

            let expectedHtml = [
                `<div class="test-block__author">`,
                    `<div class="test-block__author__id" v-if="author.id">`,
                        `{{author.id}}`,
                    `</div>`,
                    `<div class="test-block__author__link">`,
                        `<div class="test-block__author__link__text" v-if="author.link.text">`,
                            `{{author.link.text}}`,
                        `</div>`,
                        `<div class="test-block__author__link__href" v-if="author.link.href">`,
                            `{{author.link.href}}`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates un-nested, single property object array markup', function() {

            let json = {
                authors: [
                    {
                        name: ""
                    }
                ]
            };

            let expectedHtml = [
                `<div class="test-block__authors" v-if="authors && authors.length">`, 
                    `<div class="test-block__authors__author" v-for="(author, index) in authors" :key="index">`, 
                        `<div class="test-block__authors__author__name" v-if="author.name">`,
                            `{{author.name}}`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates nested, multi-property array markup', function() {

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
                `<div class="test-block__authors" v-if="authors && authors.length">`,
                    `<div class="test-block__authors__author" v-for="(author, index) in authors" :key="index">`,       
                        `<div class="test-block__authors__author__articles" v-if="author.articles && author.articles.length">`,
                            `<div class="test-block__authors__author__articles__article" v-for="(article, index) in author.articles" :key="index">`,
                                `<div class="test-block__authors__author__articles__article__title" v-if="article.title">`,
                                    `{{article.title}}`,
                                `</div>`,
                            `</div>`,
                        `</div>`,
                        `<div class="test-block__authors__author__name" v-if="author.name">`,
                            `{{author.name}}`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates nested, single property array markup', function() {

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
                `<div class="test-block__authors" v-if="authors && authors.length">`,
                    `<div class="test-block__authors__author" v-for="(author, index) in authors" :key="index">`,
                        `<div class="test-block__authors__author__books" v-if="author.books && author.books.length">`,
                            `<div class="test-block__authors__author__books__book" v-for="(book, index) in author.books" :key="index">`,
                                `<div class="test-block__authors__author__books__book__name" v-if="book.name">`,
                                    `{{book.name}}`,
                                `</div>`,
                            `</div>`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates one type sub-block markup', function() {

            let json = {
                authors: [
                    {
                        $ref: "/parAuthor"
                    }
                ]
            };

            let expectedHtml = [
                `<div class="test-block__authors" v-if="authors && authors.length">`,
                    `<author v-for='(author, index) in authors' :key='index' v-bind="author"></author>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates anyOf sub-block markup', function() {

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
                `<div class="test-block__authors" v-if="authors && authors.length">`,
                    `<div class="test-block__authors__author" v-for="(author, index) in authors" :key="index">`,
                        `<component :is="author._ref.replace('/par', '')" :key="index" v-bind="author"></component>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates complex sub-blocks markup', function() {

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
                        links: [
                            {
                                $ref: "/parLink"
                            }
                        ]
                    }
                ]
            };

            let expectedHtml = [
                `<div class="test-block__authors" v-if="authors && authors.length">`,
                    `<div class="test-block__authors__author" v-for="(author, index) in authors" :key="index">`,
                        `<div class="test-block__authors__author__articles" v-if="author.articles && author.articles.length">`,
                            `<article v-for='(article, index) in author.articles' :key='index' v-bind='article'></article>`,
                        `</div>`,
                        `<author v-if="author.info" v-bind="author.info"></author>`,
                        `<div class="test-block__authors__author__images" v-if="author.images && author.images.length">`,
                            `<div class="test-block__authors__author__images__image" v-for="(image, index) in author.images" :key="index">`,
                                `<image v-if="image.thumbnail" v-bind="image.thumbnail"></image>`,
                            `</div>`,
                        `</div>`,
                        `<div class="test-block__authors__author__links" v-if="author.links && author.links.length">`,
                            `<link v-for='(link, index) in author.links' :key='index' v-bind='link'></link>`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates data structure sub-block markup', function() {

            let json = {
                logo: {
                    $ref: "/dataImage"
                },
                contactDetails: [
                    {
                        icon: {
                            $ref: "/dataImage"
                        },
                        link: {
                            $ref: "/dataLink"
                        }
                    }
                ],
                socialLinks: [
                    {
                        link: {
                            $ref: "/dataLink"
                        },
                        icon: {
                            $ref: "/dataImage"
                        }
                    }
                ],
                links: [
                    {
                        $ref: "/dataLink"
                    }
                ]
            };

            let expectedHtml = [
                `<picture v-if="logo.src" class="test-block__logo">`,
                    `<img :src="logo.src" :alt="logo.alt">`,
                `</picture>`,
                `<div class="test-block__contact-details" v-if="contactDetails && contactDetails.length">`,
                    `<div class="test-block__contact-details__contact-detail" v-for="(contactDetail, index) in contactDetails" :key="index">`,
                        `<picture v-if="contactDetail.icon.src" class="test-block__contact-details__contact-detail__icon">`,
                            `<img :src="contactDetail.icon.src" :alt="contactDetail.icon.alt">`,
                        `</picture>`,
                        `<a v-if="contactDetail.link.href && contactDetail.link.label" class="test-block__contact-details__contact-detail__link" :href="contactDetail.link.href" :title="contactDetail.link.title" :target="contactDetail.link.isNewTab ? '_blank' : false" :rel="contactDetail.link.isExternalLink ? 'noopener noreferrer' : false">`,
                            `{{contactDetail.link.label}}`,
                        `</a>`,
                    `</div>`,
                `</div>`,
                `<div class="test-block__social-links" v-if="socialLinks && socialLinks.length">`,
                    `<div class="test-block__social-links__social-link" v-for="(socialLink, index) in socialLinks" :key="index">`,
                        `<a v-if="socialLink.link.href && socialLink.link.label" class="test-block__social-links__social-link__link" :href="socialLink.link.href" :title="socialLink.link.title" :target="socialLink.link.isNewTab ? '_blank' : false" :rel="socialLink.link.isExternalLink ? 'noopener noreferrer' : false">`,
                            `{{socialLink.link.label}}`,
                        `</a>`,
                        `<picture v-if="socialLink.icon.src" class="test-block__social-links__social-link__icon">`,
                            `<img :src="socialLink.icon.src" :alt="socialLink.icon.alt">`,
                        `</picture>`,
                    `</div>`,
                `</div>`,
                `<div class="test-block__links" v-if="links && links.length">`,
                    `<a v-for="(link, index) in links" :key="index" v-if='link.href && link.label' class="test-block__links__link" :href="link.href" :title="link.title" :target="link.isNewTab ? '_blank' : false" :rel="link.isExternalLink ? 'noopener noreferrer' : false">`,
                        `{{link.label}}`,
                    `</a>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });

        it('Creates different array type markup', function() {

            let json = {
                arrayName: [""],
                containingArray: [
                    {
                        numberList: [0.1],
                        integerList: [0],
                        stringList: [""]
                    }
                ]
            };

            let expectedHtml = [
                `<div class="test-block__array-name" v-if="arrayName && arrayName.length">`,
                    `<div class='test-block__array-name__item' v-for="(item_1, index) in arrayName" :key='index'>{{item_1}}</div>`,
                `</div>`,
                `<div class="test-block__containing-array" v-if="containingArray && containingArray.length">`,
                    `<div class="test-block__containing-array__item" v-for="(item_1, index) in containingArray" :key="index">`,
                        `<div class="test-block__containing-array__item__number-list" v-if="item_1.numberList && item_1.numberList.length">`,
                            `<div class='test-block__containing-array__item__number-list__item' v-for="(item_2, index) in item_1.numberList" :key='index'>{{item_2}}</div>`,
                        `</div>`,
                        `<div class="test-block__containing-array__item__integer-list" v-if="item_1.integerList && item_1.integerList.length">`,
                            `<div class='test-block__containing-array__item__integer-list__item' v-for="(item_2, index) in item_1.integerList" :key='index'>{{item_2}}</div>`,
                        `</div>`,
                        `<div class="test-block__containing-array__item__string-list" v-if="item_1.stringList && item_1.stringList.length">`,
                            `<div class='test-block__containing-array__item__string-list__item' v-for="(item_2, index) in item_1.stringList" :key='index'>{{item_2}}</div>`,
                        `</div>`,
                    `</div>`,
                `</div>`,
            ];

            actAndAssert(json, expectedHtml);
        });
    })
});