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
    dataSettings: {
        addModifiersProperty: false
    },
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
                openingTagNoChildWrapper: function(options) {                    
                    let wrapperOptions = options.plugins._.cloneDeep(options);
                    var latestArrayContext = options.plugins._.last(options.relativePath);
                    var childContext = options.plugins.inflector.singularize(latestArrayContext);
                    options.plugins.buildClass.addChildClass(options);

                    var output = `<${wrapperOptions.markupSettings.defaultMarkupTag} class="${wrapperOptions.plugins.buildClass.run(wrapperOptions)}" v-if="${wrapperOptions.relativePath.join('.')}">\n` +
                                        `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}" v-for="(${childContext}, index) in ${options.relativePath.join('.')}" :key="index">\n`;   
                    options.relativePath = [childContext];
                    return output;
                },
                closingTagNoChildWrapper: function(options) {
                    return      `</${options.markupSettings.defaultMarkupTag}>\n` + 
                            `</${options.markupSettings.defaultMarkupTag}>\n`;                    
                },
                openingTag: function(options) {
                    return this.openingTagNoChildWrapper(options);
                },
                closingTag: function(options) {
                    return this.closingTagNoChildWrapper(options);
                }        
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
                return `<component v-bind:is="${options.relativePath.join('.')}._ref.replace('/par', '')" v-bind:key="index" v-bind="${options.relativePath.join('.')}"></component>\n`;                
            },
            namedSubBlockArray: function(options) {
                return `<component v-bind:is="${options.relativePath.join('.')}._ref.replace('/par', '')" v-bind:key="index" v-bind="${options.relativePath.join('.')}"></component>\n`;                
            },
            subBlockObject: function(options) {
                return `<component v-if="${options.relativePath.join('.')}" v-bind:is="${options.relativePath.join('.')}.replace('par', '')" v-bind:key="index" v-bind="${options.relativePath.join('.')}"></component>\n`;                        
            },    
            default: function(options) {
                return `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}" v-if="${options.relativePath.join('.')}">\n` +
                `{{${options.relativePath.join('.')}}}\n` +
                `</${options.markupSettings.defaultMarkupTag}>\n`;                        
            },
        },
        dataStructureMarkupFragments: {
            dataImage: function(options) {
                let relativePath = options.relativePath.join('.');
                return `<picture v-if="${relativePath}.src" class="${options.plugins.buildClass.run(options)}">\n` +
                            `<img :src="${relativePath}.src" :alt="${relativePath}.alt">\n` +
                        `</picture>\n`;
            },
            dataLink: function(options) {
                let relativePath = options.relativePath.join('.');
                return `<a v-if="${relativePath}.href && ${relativePath}.label" class="${options.plugins.buildClass.run(options)}" :href="${relativePath}.href" :title="${relativePath}.title" :target="${relativePath}.isNewTab ? '_blank' : false" :rel="${relativePath}.isExternalLink ? 'noopener noreferrer' : false">\n` +
                        `{{${relativePath}.label}}\n` +
                    `</a>\n`;                       
            },
            dataForm: function(options) {
                return `<!-- Insert ${options.relativePath.join('.')} form here -->\n`;                        
            },
        }
    },
    markupSettings: {
        defaultMarkupTag: "div",
        classNameDivider: "__",
        indentSize: 4,
        backupRefArrayChildClass: "item",
        fileExtension: ".vue",
        initalMarkup: function(options) {
            return `<script>\nexport default {\n    props: {}\n};\n</script>\n<template><div class=\"${options.className}\"><!-- YUZU MARKUP --></div></template>`;
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