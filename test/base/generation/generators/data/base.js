const svc = require("../../../../../generation/generators/data/data.js"),
  simplePropertyParser = require("../../../../../generation/generators/data/parsers/simplePropertyParser.js"),
  subBlockAsObjectParser = require("../../../../../generation/generators/data/parsers/subBlockAsObjectParser.js"),
  subBlockAsPropertyParser = require("../../../../../generation/generators/data/parsers/subBlockAsPropertyParser.js"),
  dataScopingService = require("../../../../../generation/generators/data/services/dataScopingService.js");

const output = (logger) => {

  const baseSettings = require('../../../../../config/configFactory').createForTesting({ modules: [] });
  baseSettings.logger = logger;

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
