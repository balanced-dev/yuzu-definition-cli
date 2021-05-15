module.exports = (config) => {

    config.generators.markup = require('../../generation/generators/markup/markup');
    config.createThese.push('markup');
    config.creators.push({ 
        name: 'markup', 
        module: require('../../creation/creators/markup') 
    });

    config.markup = {
        settings : {
            defaultTag: "div",
            filePrefix: {
                block: '',
                page: ''
            },
            fileExtension: ".html",
            initialContent: function (options) {
                return ``;
            }
        },
        fragments : {
            wrapperMarkupFragments: {
                array: {
                    parentWrapperOpening: () => {},
                    parentWrapperClosing: () => {},
                    simpleTypeOpening: () => {},
                    simpleTypeClosing: () => {},
                    dataStructuresOpening: () => {},
                    dataStructuresClosing: () => {},
                    dynamicRefsOpening: () => {},
                    dynamicRefsClosing: () => {},
                    refsOpening: () => {},
                    refsClosing: () => {}
                }, 
                object: {
                    openingTag: () => {},
                    closingTag: () => {}
                }
            },
            contentMarkupFragments: {
                dynamicSubBlockArray: () => {},
                namedSubBlockArray: () => {},
                subBlockObject: () => {},
                default: () => {}
            },
            dataStructureMarkupFragments: {
                dataImage: () => {},
                dataLink: () => {},
                dataForm: () => {}
            }
        } 
    };
  
    config.interceptorsPipeline.push({
        type: 'markup',
        order: 5,
        apply: (json, config) => {
            return function(html, cardSettings) {
                let markupGeneration = config.generators.markup.run(html, cardSettings, json, cardSettings.config);
                cardSettings.markup = markupGeneration.content;
                return markupGeneration.full;
            } 
        }
    });

};