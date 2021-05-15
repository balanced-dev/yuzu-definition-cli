module.exports = (config) => {
  config.generation = {
    card: {
      startLineContent: "Schema",
      propertyLinePrefix: "- ",
      titlePrefixes: {
        block: "Block - ",
        page: "Page - ",
      },
    },
    propertyTypes: {
      array: {
        defaultValue: function () {
          return [{}];
        },
      },
      object: {
        defaultValue: function () {
          return {};
        },
      },
      boolean: {
        defaultValue: function () {
          return true;
        },
      },
      integer: {
        defaultValue: function () {
          return 0;
        },
      },
      number: {
        defaultValue: function () {
          return 0.1;
        },
      },
      string: {
        defaultValue: function () {
          return "";
        },
      },
      integerArray: {
        defaultValue: function () {
          return [0];
        },
      },
      numberArray: {
        defaultValue: function () {
          return [0.1];
        },
      },
      stringArray: {
        defaultValue: function () {
          return [""];
        },
      },
      subBlock: {
        defaultValue: function (subBlockName) {
          return { $ref: "/" + subBlockName };
        },
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
  };
  config.generators = {};
  config.generation.reservedKeywords = Object.keys(config.generation.propertyTypes);
};
