const svc = require("../../../../../generation/generators/data/data.js"),
  simplePropertyParser = require("../../../../../generation/generators/data/parsers/simplePropertyParser.js"),
  subBlockAsObjectParser = require("../../../../../generation/generators/data/parsers/subBlockAsObjectParser.js"),
  subBlockAsPropertyParser = require("../../../../../generation/generators/data/parsers/subBlockAsPropertyParser.js"),
  dataScopingService = require("../../../../../generation/generators/data/services/dataScopingService.js");

const output = (logger) => {
  const baseSettings = {
    generation: {
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
            return 0;
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
    },
    prefixes: {
      block: {
        file: "",
      },
      page: {
        file: "",
      },
      schema: {
        file: "",
      },
      property: {
        card: "- ",
      },
    },
    logger: logger,
  };

  baseSettings.generation.reservedKeywords = Object.keys(baseSettings.generation.propertyTypes);

  return {
    svc: svc,
    scopingService: dataScopingService,
    structures: {
      simpleProperty: simplePropertyParser.structure,
      subBlockAsObject: subBlockAsObjectParser.structure,
      subBlockAsProperty: subBlockAsPropertyParser.structure,
    },

    settings: baseSettings,
  };
};

module.exports = output;
