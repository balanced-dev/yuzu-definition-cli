const generateChildContext = function(options) {
    const Inflector = options.plugins.inflector;
    let lastArrayContext = options.plugins._.last(options.relativePath);
    return Inflector.singularize(lastArrayContext) !== lastArrayContext ? Inflector.singularize(lastArrayContext) : 'item_' + options.absolutePath.length;
};

const getVuePartial = function(options) {
    const kebabCase = options.plugins.changeCase.paramCase;
    let hyphenatedPartial = kebabCase(options.value);
    let partialPrefix = options.prefixes.block.fileName + '-';
    hyphenatedPartial = hyphenatedPartial.substring(0, partialPrefix.length) === partialPrefix ? hyphenatedPartial.substring(partialPrefix.length) : hyphenatedPartial;
    return hyphenatedPartial;
};

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
                    let childContext = generateChildContext(options);
                    options.plugins.buildClass.addChildClass(options);

                    let output = `<${wrapperOptions.markupSettings.defaultMarkupTag} class="${wrapperOptions.plugins.buildClass.run(wrapperOptions)}" v-if="${wrapperOptions.relativePath.join('.')} && ${wrapperOptions.relativePath.join('.')}.length">\n` +
                                        `<${options.markupSettings.defaultMarkupTag} class="${options.plugins.buildClass.run(options)}" v-for="(${childContext}, index) in ${wrapperOptions.relativePath.join('.')}" :key="index">\n`;   
                    options.relativePath = [childContext];
                    return output;
                },
                parentWrapperClosing: function(options, propertyCount) {
                    return      `</${options.markupSettings.defaultMarkupTag}>\n` + 
                            `</${options.markupSettings.defaultMarkupTag}>\n`;      
                },
                simpleTypeOpening: function(options) {
                    let wrapperOptions = options.plugins._.cloneDeep(options);
                    let childContext = generateChildContext(options);
                    let output = `<${wrapperOptions.markupSettings.defaultMarkupTag} class="${wrapperOptions.plugins.buildClass.run(wrapperOptions)}" v-if="${wrapperOptions.relativePath.join('.')} && ${wrapperOptions.relativePath.join('.')}.length">\n` +
                                        `<template v-for="(${childContext}, index) in ${wrapperOptions.relativePath.join('.')}">\n`;   
                    options.relativePath = [childContext];
                    return output;
                },
                simpleTypeClosing: function(options) {
                    return      `</template>\n` + 
                            `</${options.markupSettings.defaultMarkupTag}>\n`;
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
                return `<component :is="${options.relativePath.join('.')}._ref.replace('/par', '')" :key="index" v-bind="${options.relativePath.join('.')}"></component>\n`;                
            },
            namedSubBlockArray: function(options) {
                const partialReference = getVuePartial(options);
                return `<${partialReference} v-if="${options.relativePath.join('.')}" :key="index" v-bind="${options.relativePath.join('.')}"></${partialReference}>\n`;                
            },
            subBlockObject: function(options) {
                const partialReference = getVuePartial(options);
                return `<${partialReference} v-if="${options.relativePath.join('.')}" v-bind="${options.relativePath.join('.')}"></${partialReference}>\n`;                        
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