const _ = require('lodash');

const subPropertiesToBeRemoved = [
    "required"
];

const isSubPropertiesPresent = function(parent) {
    let found = false;

    subPropertiesToBeRemoved.forEach(propertyName => {
        let property = _.get(parent, propertyName, undefined);

        if(property !== undefined) {
            found = true;
        }
    });

    return found;
};

const removeSubProperty = function(parent, propertyName) {
    let property = _.get(parent, propertyName, undefined);

    if(property !== undefined) {
        _.unset(parent, propertyName);
    }
    return parent;
};

const disallowAdditionalProperties = function(property) {
    if(!property.$ref && !property.additionalProperties) {
        property.additionalProperties = false;
    }
    return property;
};

const isValid = function (property, value, dataPropertyValue) {
    return value.type !== "object" || (value.type === "object" && !isSubPropertiesPresent(value));
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    let property = schemaProperties[propertyName];

    subPropertiesToBeRemoved.forEach(propertyName => {
        property = removeSubProperty(property, propertyName);
    });

    property = disallowAdditionalProperties(property);

    return schemaProperties;
};

module.exports = { isValid, run };