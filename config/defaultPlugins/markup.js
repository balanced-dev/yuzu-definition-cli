module.exports = (config) => {

    config.generators.markup = require('../../generation/generators/markup/markup');
    config.createThese.push('markup');
    config.creators.push({ 
        name: 'markup', 
        module: require('../../creation/creators/markup') 
    });

    const basicArrayOpening = function(options) {
        return `<${options.markup.settings.defaultTag} class="${options.style.generateClassString(options)}">\n`
    };

    const basicArrayClosing = function(options) {
        return `</${options.markup.settings.defaultTag}>\n`;
    };

    config.markup = {
        settings : {
            defaultTag: "div",
            filePrefix: {
                block: '',
                page: ''
            },
            fileExtension: ".html",
            subdirectory: '',
            initialContent: function (options) {
                return ``;
            }
        },
        fragments : {
            wrapperMarkupFragments: {
                array: {
                    parentWrapperOpening: (options) => basicArrayOpening(options),
                    parentWrapperClosing: (options) => basicArrayClosing(options),
                    simpleTypeOpening: (options) => basicArrayOpening(options),
                    simpleTypeClosing: (options) => basicArrayClosing(options),
                    dataStructuresOpening: (options) => basicArrayOpening(options),
                    dataStructuresClosing: (options) => basicArrayClosing(options),
                    dynamicRefsOpening: (options) => basicArrayOpening(options),
                    dynamicRefsClosing: (options) => basicArrayClosing(options),
                    refsOpening: (options) => basicArrayOpening(options),
                    refsClosing: (options) => basicArrayClosing(options)
                }, 
                object: {
                    openingTag: (options) => {
                        const tag = options.markup.settings.defaultTag;
                        return `<${tag} class="${options.style.generateClassString(options)}">\n`; 
                    },
                    closingTag: (options) => {
                        const tag = options.markup.settings.defaultTag;
                        return `</${tag}>\n`; 
                    }
                }
            },
            contentMarkupFragments: {
                dynamicSubBlockArray: () => { return ''; },
                namedSubBlockArray: () => { return ''; },
                subBlockObject: (options) => {
                    const tag = options.markup.settings.defaultTag;
                    return `<${tag} class="${options.style.generateClassString(options)}">\n</${tag}>\n`
                },
                default: (options) => {
                    const tag = options.markup.settings.defaultTag;
                    return `<${tag} class="${options.style.generateClassString(options)}">\n</${tag}>\n`
                }
            },
            dataStructureMarkupFragments: {
                dataImage: (options) => {
                    return `<picture class="${options.style.generateClassString(options)}">\n` +
                                `<img src="" alt="" loading="lazy" decoding="async">\n` +
                            `</picture>\n`;
                },
                dataLink: (options) => {
                    return `<a class="${options.style.generateClassString(options)}" href="" title=""></a>\n`;
                },
                dataForm: (options) => {
                    return `<div class="${options.style.generateClassString(options)}">\n</div>\n`;
                }
            }
        } 
    };
  
    config.interceptorsPipeline.push({
        type: 'markup',
        order: 5,
        apply: (json, config) => {
            return function(html, cardSettings) {
                let markupGeneration = config.generators.markup.run(html, cardSettings, json, config);
                cardSettings.markup = markupGeneration.content;
                return markupGeneration.full;
            } 
        }
    });

};