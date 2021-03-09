const isValid = function (property, value, dataPropertyValue) {
    return value.properties === undefined || (value.properties != undefined && value.properties.$ref === undefined);
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    schemaProperties[propertyName] = dataPropertyValue;

    return schemaProperties;
};

module.exports = { isValid, run };