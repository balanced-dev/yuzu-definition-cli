const buildClass = require('./services/buildClass');
module.exports = () => {

  var config = {
    blockPaths: {
        page: { 
            path: '/pages/'
        },
        block: { 
            path: '/components/'
        },
        layout: { 
            path: '/layouts/'
        }
    },
    prefixes: {
      block: {
        card: "Block - ",
        file: "",
      },
      page: {
        card: "Page - ",
        file: "",
      },
      schema: {
        card: "Schema",
        file: "",
      },
      property: {
        card: "- "
      },
    },
    propertyTypes: {
        array: {
            defaultValue: function() {
                return [{}];
            }
        },
        object: {
            defaultValue: function() {
                return {};
            }
        },
        boolean: {
            defaultValue: function() {
                return true;
            }
        },
        integer: {
            defaultValue: function() {
                return 0;
            }
        },
        number: {
            defaultValue: function() {
                return 0.1;
            }
        },
        string: {
            defaultValue: function() {
                return '';
            }
        },
        integerArray: {
            defaultValue: function() {
                return [0];
            }
        },
        numberArray: {
            defaultValue: function() {
                return [0.1];
            }
        },
        stringArray: {
            defaultValue: function() {
                return [''];
            }
        },
        subBlock: {
            defaultValue: function(subBlockName){
                return {'$ref': '/' + subBlockName};
            }
        }
    },
    dataStructures: {
      dataImage: {
        src: "",
        alt: "",
        height: 0,
        width: 0,
      },
      dataLink: {
        label: "",
        href: "#",
        title: "",
        isNewTab: false,
        isExternalLink: false,
        iconName: "",
        isActive: false,
      },
      dataForm: {
        testForm: {},
      },
    },
    markup: {
        settings : {
            defaultTag: "div"
        },
        fragments : {} 
    },
    style: {
        settings: {
            fileExtension: '.css',
            classNameDivider: '__',
            backupRefArrayChildClass: 'item',
            initialStyle: function(options) {
                return `.${options.className} {\n\n`+
                
                `}\n\n` +
                
                `/* YUZU STYLE */`;
            }
        },
        appendChildContextClass: buildClass.appendChildContextClass,
        generateClassString: buildClass.generateClassString
    },
    script: {
        settings: {
            
        }
    },
    generators: {
        markup: require('../generation/generators/markup/markup'),
        style: require('../generation/generators/style/style'),
        schemaCleanup: require('../generation/generators/schemaCleanup/schemaCleanup')
    },
    interceptorsPipeline: [],
    creators: [
        { name: 'markup', module: require('../creation/creators/markup') }, 
        { name: 'schema', module: require('../creation/creators/schema') }
    ],
    plugins: {}
  };

  config.markup.settings.fileExtension = ".html";
  config.markup.settings.initialMarkup = function (options) {
    return ``;
  };

    config.interceptorsPipeline.push({
        name: 'schema',
        apply: (interceptors, json, config) => {
            interceptors.schema = function(schema, cardSettings) {
                return config.generators.schemaCleanup.processProperties(schema, json);
            } 
        }
    });

    config.interceptorsPipeline.push({
        name: 'markup',
        apply: (interceptors, json, config) => {
            interceptors.markup = function(html, cardSettings) {
                let markupGeneration = config.generators.markup.run(html, cardSettings, json, cardSettings.config);
                cardSettings.markup = markupGeneration.content;
                return markupGeneration.full;
            } 
        }
    });

    config.interceptorsPipeline.push({
        name: 'style',
        apply: (interceptors, json, config) => {
            interceptors.style = function(styles, cardSettings) {
                return config.generators.style.run(styles, cardSettings, cardSettings.markup, config);
            } 
        }
    });

    return config;
} 
