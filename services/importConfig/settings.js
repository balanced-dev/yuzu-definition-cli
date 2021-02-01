const path = require("path");
const workingRootDirectory = path.resolve("./");
const workingConfigDirectory = path.join(workingRootDirectory, 'config');
const settingsFilename = 'yuzu.config.js';
let settingsPath = path.resolve(workingConfigDirectory, settingsFilename);
const override = require('./logic/overrideDefaults');
const _ = require('lodash');

const getConfigProperty = function(property) {
    try {
        let file = require(settingsPath);
        return file[property];        
    }
    catch (e) {
        console.log('The setting "' + property + '" could not be loaded.');
        return undefined;
    }    
};

const defaults = {
    markupSettings: {
        defaultMarkupTag: "div",
        classNameDivider: "__",
        indentSize: 4,
        backupRefArrayChildClass: "item",
        fileExtension: ".hbs",
        initalMarkup: "<div class=\"${yuzu.className}{{#each _modifiers}} ${yuzu.className}--{{this}}{{/each}}\">\n\n</div>"
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
    dataSettings: {
        addModifiersProperty: false
    },
    localFiles: {
        directoryPath: "./blockGeneration"
    },
    markupFragments: {
        wrapperMarkupFragments: {
            array: {
                openingTagNoChildWrapper: function(options) {
                    return `{{#if ${options.relativePath.join('.')}.[0]}}\n` +
                                `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n` +
                                    `{{#each ${options.relativePath.join('.')}}}\n`;
                    
                },
                closingTagNoChildWrapper: function(options) {
                    return         `{{/each}}\n` +
                                `</${options.markupSettings.defaultMarkupTag}>\n` +
                            `{{/if}}\n`;
                    
                },
                openingTag: function(options) {
                    let wrapperOptions = _.cloneDeep(options);
                    options.plugins.buildClass.addChildClass(options);
                    return this.openingTagNoChildWrapper(wrapperOptions) + 
                            `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n`;
                },
                closingTag: function(options) {
                    return `</${options.markupSettings.defaultMarkupTag}>\n`
                            + this.closingTagNoChildWrapper(options);
                }        
            },
            object: {
                openingTag: function(options) {
                    return `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n`;        
                },
                closingTag: function(options) {
                    return `</${options.markupSettings.defaultMarkupTag}>\n`;
                }
            }
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
            default: function(options) {
                return `{{#if ${options.relativePath.join('.')}}}\n` +
                            `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}">\n` +
                                `{{${options.relativePath.join('.')}}}\n` +
                            `</${options.markupSettings.defaultMarkupTag}>\n` +
                        `{{/if}}\n`;
            }
        }
    },
    generationSource: '',
    trello: {
        list: "",
        "board" : "",
        key: "",
        secret: ""
    },
    yuzuPro: {
        key: ""
    },
    plugins: {
        changeCase: require('change-case'),
        inflector: require('inflector-js'),
        buildClass: require('./plugins/buildClass'),
    },
};


const run = function() {
    try {
        overrides = require(settingsPath);
        settings = override(defaults, overrides);
    }
    catch (e) {
        console.log(e);
    }
    return settings;
}

const overrideSettingsPath = function(stringPath) {
    settingsPath = path.resolve(stringPath);
}


let overrides = {};
let settings = {};

module.exports = {settings, overrideSettingsPath, run, settingsPath};