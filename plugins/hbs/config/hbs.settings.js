const getPropertyCount = function(options) {
    return Object.keys(options.value[0]).length;
}

const basicArrayOpening = function(options, newContext) {
    let output =    `{{#if ${options.relativePath.join('.')}.[0]}}\n` +
                        `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n` +
                            `{{#each ${options.relativePath.join('.')}}}\n`;
    options.relativePath = !newContext ? [] : [newContext];
    
    return output;
};
const basicArrayClosing = function(options) {
    return          `{{/each}}\n` +
                        `</${options.markup.settings.defaultTag}>\n` +
                    `{{/if}}\n`;
};

module.exports = (config) => {
  config.markup.settings.fileExtension = ".hbs";
  config.markup.settings.initialContent = function(options) {
            return `<div class=\"${options.className}{{#each _modifiers}} ${options.className}--{{this}}{{/each}}">\n` +
                        `<!-- YUZU MARKUP -->` +
                    `</div>`
        };
  config.markup.fragments = {
    wrapperMarkupFragments: {
        array: {
            parentWrapperOpening: function(options, newContext, forceWrapper) {
                let propertyCount = getPropertyCount(options);

                if(propertyCount && propertyCount === 1 && !forceWrapper) {
                    return basicArrayOpening(options, newContext)
                }
                else {
                    let wrapperOptions = options.plugins._.cloneDeep(options);
                    options.style.appendChildContextClass(options);
                    options.relativePath = !newContext ? [] : [newContext];
                    return  basicArrayOpening(wrapperOptions, newContext) + 
                                `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n`;
                }
            },
            parentWrapperClosing: function(options, newContext, forceWrapper) {
                let propertyCount = getPropertyCount(options);

                if(propertyCount && propertyCount === 1 && !forceWrapper) {
                    return basicArrayClosing(options, newContext);
                }
                else {
                    return      `</${options.markup.settings.defaultTag}>\n` +
                            basicArrayClosing(options, newContext); 
                } 
            },
            simpleTypeOpening: function(options) {
                return basicArrayOpening(options, 'this');
            },
            simpleTypeClosing: function(options) {
                return basicArrayClosing(options);
            },
            dataStructuresOpening: function(options) {
                return basicArrayOpening(options, 'this');
            },
            dataStructuresClosing: function(options) {
                return basicArrayClosing(options);
            },
            dynamicRefsOpening: function(options) {
                return this.parentWrapperOpening(options, 'this', true);
            },
            dynamicRefsClosing: function(options) {
                return this.parentWrapperClosing(options, 'this', true);
            },
            refsOpening: function(options) {
                return this.parentWrapperOpening(options, 'this', true);
            },
            refsClosing: function(options) {
                return this.parentWrapperClosing(options, 'this', true);
            }, 
        },
        object: {
            openingTag: function(options) {
                return `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n`;        
            },
            closingTag: function(options) {
                return `</${options.markup.settings.defaultTag}>\n`;
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
                        `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n` +
                            `{{> ${options.value} ${relativePath} }}\n` +
                        `</${options.markup.settings.defaultTag}>\n` +
                    `{{/if}}\n`;
        },    
        default: function(options) {
            return `{{#if ${options.relativePath.join('.')}}}\n` +
            `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n` +
            `{{${options.relativePath.join('.')}}}\n` +
            `</${options.markup.settings.defaultTag}>\n` +
            `{{/if}}\n`;
        },
    },
    dataStructureMarkupFragments: {
        dataImage: function(options) {
            let relativePath = options.relativePath.join('.');
            return `{{#if ${relativePath}.src}}\n` +
                        `<picture class="${options.style.generateClassString(options)}">\n` +
                            `<img src="{{${relativePath}.src}}" alt="{{${relativePath}.alt}}">\n` +
                        `</picture>\n` +
                    `{{/if}}\n`;
        },
        dataLink: function(options) {
            let relativePath = options.relativePath.join('.');
            return `{{#if ${relativePath}.href}}\n` +
                        `<a class="${options.style.generateClassString(options)}" href="{{${relativePath}.href}}" title="{{${relativePath}.title}}" {{#if ${relativePath}.isNewTab}}target="_blank"{{/if}} {{#if ${relativePath}.isExternalLink}}rel="noopener noreferrer"{{/if}}>\n` +
                            `{{${relativePath}.label}}\n` +
                        `</a>\n` +
                    `{{/if}}\n`;
        },
        dataForm: function(options) {
            return `{{#if ${options.relativePath.join('.')}}}\n` +
                        `<div class="${options.style.generateClassString(options)}">\n` +
                            `{{!-- {{> parForm ${options.relativePath.join('.')} }} --}}\n` +
                        `</div>\n` +
                    `{{/if}}\n`;
        },
    }
};
  config.createThese = ['directories', 'schema', 'data', 'markup', 'style']; 

  config.plugins._ = require("lodash");
  config.plugins.changeCase = require("change-case");
  config.plugins.inflector = require("inflector-js");

};
