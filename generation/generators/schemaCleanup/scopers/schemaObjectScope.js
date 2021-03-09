const isValid = function (property, value, dataPropertyValue) {
    return value.properties !== undefined;
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    return {
        schema: schemaProperties[propertyName],
        data: dataPropertyValue
    };
};

module.exports = { isValid, run };