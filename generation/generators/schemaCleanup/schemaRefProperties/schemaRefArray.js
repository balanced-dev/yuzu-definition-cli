const isValid = function (property, value, dataPropertyValue) {
    let isArray = value.type == 'array',
        isArrayRefs = value.items && ((value.items.$ref) || (value.items.properties && value.items.properties.$ref)) && dataPropertyValue.length > 1;
        
    return !(isArray && isArrayRefs);
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {

    schemaProperties[propertyName] = {
        type: "array",
        items: {
            anyOf: dataPropertyValue
        }
    };

    return schemaProperties;
};

module.exports = { isValid, run };