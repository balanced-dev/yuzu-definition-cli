module.exports = () => {

  return {
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

        }
    },
    creators: [
        { name: 'markup', module: require('../creation/creators/markup') }, 
        { name: 'schema', module: require('../creation/creators/schema') }
    ],
    plugins: {}
  };
} 
