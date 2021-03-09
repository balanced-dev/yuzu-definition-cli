const isValid = function (property, value, dataPropertyValue) {
    let isArray = value.type == 'array',
        isArrayRefs = value.items && value.items.properties && value.items.properties.$ref;
    
    return !(isArray && isArrayRefs);
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {

    let refValue = dataPropertyValue[0].$ref;

    schemaProperties[propertyName] = {
        type: "array",
        items: {
            $ref: refValue
        }
    };

    return schemaProperties;
};

module.exports = { isValid, run };