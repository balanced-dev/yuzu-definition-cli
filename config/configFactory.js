const path = require("path");
const _ = require('lodash');
let userConfigPath = path.resolve('./yuzu.config.js');
const overrideConfig = require('./services/overrideDefaults');

const create = () => {

    try {
        let userConfig = require(userConfigPath);
        const defaultConfig = require(`./defaults/${userConfig.type}`);
        return overrideConfig(defaultConfig, userConfig);
    }
    catch (e) {
        console.log(e);
    }
    return {};

}


const createForTesting = (type) => {

    try {
        const config = require(`./defaults/${type}`);
        return _.defaultsDeep({}, config);
    }
    catch (e) {
        console.log(e);
    }
    return {};

}

module.exports = { create, createForTesting };