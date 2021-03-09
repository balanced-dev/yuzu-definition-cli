const isValid = function (property, value, dataPropertyValue) {
    return value.items !== undefined;
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    return {
        schema: schemaProperties[propertyName].items,
        data: dataPropertyValue[0]
    };
};

module.exports = { isValid, run };