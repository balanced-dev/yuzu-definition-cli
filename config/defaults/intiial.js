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
    cardSource: "",
    trello: {
      list: "",
      board: "",
      key: "",
      secret: "",
    },
    localFiles: {
      directoryPath: "./blockGeneration",
    },

    markupSettings: {
      defaultMarkupTag: "div"
    },
    processors: [
        { name: 'markup', module: require('../../creation/creators/markup') }, 
        { name: 'schema', module: require('../../creation/creators/schema') }
    ],
    markupFragments: {},
    plugins: {}
  
  };

} 
