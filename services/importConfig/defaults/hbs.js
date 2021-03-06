const { option } = require('commander');

module.exports = {    
    generationSource: '',
    yuzuPro: {
        key: ""
    },
    trello: {
        list: "",
        "board" : "",
        key: "",
        secret: ""
    },
    localFiles: {
        directoryPath: "./blockGeneration"
    },
    markupSettings: {
        defaultMarkupTag: "div",
        classNameDivider: "__",
        indentSize: 4,
        backupRefArrayChildClass: "item",
        fileExtension: ".hbs",
        initalMarkup: function(options) {
            return `<div class=\"${options.className}{{#each _modifiers}} ${options.className}--{{this}}{{/each}}">\n` +
                        `<!-- YUZU MARKUP -->` +
                    `</div>`
        }
    },
    dataSettings: {},
    styleSettings: {
        generateSeparateFile: true
    },
    schemaSettings: {
        generateSeparateFile: true
    },
    prefixes: {
        block: {
            card: "Block - ",
            fileName: "par"
        },
        page: {
            card: "Page - ",
            fileName: ""
        },
        schema: {
            card: "Schema"
        },
        property: {
            card: "- "
        }
    },
    markupFragments: {
        wrapperMarkupFragments: {
            array: {
                parentWrapperOpening: function(options, propertyCount) {
                    let wrapperOptions = options.plugins._.cloneDeep(options);
                    options.plugins.buildClass.addChildClass(options);
                    options.relativePath = [];
                    return  this.simpleTypeOpening(wrapperOptions) + 
                                `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n`;
                },
                parentWrapperClosing: function(options, propertyCount) {
                    return      `</${options.markupSettings.defaultMarkupTag}>\n` +
                            this.simpleTypeClosing(options);  
                },
                simpleTypeOpening: function(options) {
                    let output =    `{{#if ${options.relativePath.join('.')}.[0]}}\n` +
                                        `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n` +
                                            `{{#each ${options.relativePath.join('.')}}}\n`;
                    options.relativePath = [];
                    return output;
                },
                simpleTypeClosing: function(options) {
                    return                  `{{/each}}\n` +
                                        `</${options.markupSettings.defaultMarkupTag}>\n` +
                                `{{/if}}\n`;
                },
                dataStructuresOpening: function(options) {
                    return this.simpleTypeOpening(options);
                },
                dataStructuresClosing: function(options) {
                    return this.simpleTypeClosing(options);
                },
                dynamicRefsOpening: function(options) {
                    return this.parentWrapperOpening(options);
                },
                dynamicRefsClosing: function(options) {
                    return this.parentWrapperClosing(options);
                },
                refsOpening: function(options) {
                    return this.simpleTypeOpening(options);
                },
                refsClosing: function(options) {
                    return this.simpleTypeClosing(options);
                }, 
            },
            object: {
                openingTag: function(options) {
                    return `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n`;        
                },
                closingTag: function(options) {
                    return `</${options.markupSettings.defaultMarkupTag}>\n`;
                }
            },
        },
        contentMarkupFragments: {
            dynamicSubBlockArray: function(options) {
                return `{{{ dynPartial _ref ${options.relativePath.join('.')} }}}\n`;
            },
            namedSubBlockArray: function(options) {
                return `{{> ${options.value} ${options.relativePath.join('.')} }}\n`;
            },
            subBlockObject: function(options) {
                let relativePath = options.relativePath.join('.');
                return `{{#if ${relativePath}}}\n` +
                            `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n` +
                                `{{> ${options.value} ${relativePath} }}\n` +
                            `</${options.markupSettings.defaultMarkupTag}>\n` +
                        `{{/if}}\n`;
            },    
            default: function(options) {
                return `{{#if ${options.relativePath.join('.')}}}\n` +
                `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n` +
                `{{${options.relativePath.join('.')}}}\n` +
                `</${options.markupSettings.defaultMarkupTag}>\n` +
                `{{/if}}\n`;
            },
        },
        dataStructureMarkupFragments: {
            dataImage: function(options) {
                let relativePath = options.relativePath.join('.');
                return `{{#if ${relativePath}.src}}\n` +
                            `<picture class="${options.plugins.buildClass.run(options)}">\n` +
                                `<img src="{{${relativePath}.src}}" alt="{{${relativePath}.alt}}">\n` +
                            `</picture>\n` +
                        `{{/if}}\n`;
            },
            dataLink: function(options) {
                let relativePath = options.relativePath.join('.');
                return `{{#if ${relativePath}.href}}\n` +
                            `<a class="${options.plugins.buildClass.run(options)}" href="{{${relativePath}.href}}" title="{{${relativePath}.title}}" {{#if ${relativePath}.isNewTab}}target="_blank"{{/if}} {{#if ${relativePath}.isExternalLink}}rel="noopener noreferrer"{{/if}}>\n` +
                                `{{${relativePath}.label}}\n` +
                            `</a>\n` +
                        `{{/if}}\n`;
            },
            dataForm: function(options) {
                return `{{#if ${options.relativePath.join('.')}}}\n` +
                            `<div class="${options.plugins.buildClass.run(options)}">\n` +
                                `{{!-- {{> parForm ${options.relativePath.join('.')} }} --}}\n` +
                            `</div>\n` +
                        `{{/if}}\n`;
            },
        }
    },
    dataStructures: {
        dataImage: {
            src: "",
            alt: "",
            height: 0,
            width: 0
        },
        dataLink: {
            label: "",
            href: "#",
            title: "",
            isNewTab: false,
            isExternalLink: false,
            iconName: "",
            isActive: false
        },
        dataForm: {
            testForm: {}
        }
    },
    plugins: {
        _: require('lodash'),
        changeCase: require('change-case'),
        inflector: require('inflector-js'),
        buildClass: require('../plugins/buildClass'),
    },
}