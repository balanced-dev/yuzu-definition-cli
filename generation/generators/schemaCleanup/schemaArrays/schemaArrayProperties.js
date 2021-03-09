const _ = require('lodash');

const subPropertiesToBeRemoved = [
    "uniqueItems", "minItems", "items.required"
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

// Fix annoying cases where schema generation doens't add object type properties to array child objects
const ensureChildObjectType = function(arrayChildProperty) {
    if(arrayChildProperty.properties) {
        arrayChildProperty.type = 'object';
        arrayChildProperty.additionalProperties = false;
    }
};

const removeSubProperty = function(parent, propertyName) {
    let property = _.get(parent, propertyName, undefined);

    if(property !== undefined) {
        _.unset(parent, propertyName);
    }
    return parent;
};

const isValid = function (property, value, dataPropertyValue) {
    return value.type !== "array" || (value.type === "array" && !isSubPropertiesPresent(value));
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    let property = schemaProperties[propertyName];

    subPropertiesToBeRemoved.forEach(propertyName => {
        property = removeSubProperty(property, propertyName);
    });

    ensureChildObjectType(property.items);

    return schemaProperties;
};

module.exports = { isValid, run };