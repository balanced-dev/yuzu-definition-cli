const _ = require('lodash'),
    helper = require('./dataHelper');

const set = function(obj, segments, scope, typeIndexes, getValueFromSegment, config, errors) {
    let name = helper.getSegmentAttribute(segments, typeIndexes, 'name'),
        propertyParent = _.get(obj, scope.string, undefined)
        isRootProperty = scope.string.length === 0;

    if(propertyParent != undefined || isRootProperty) {

        let value = getValue(segments, typeIndexes, getValueFromSegment, config);

        if(parentObjectExistsWhenNotRoot(isRootProperty, value, propertyParent)) {
            errors.push(`Type mismatch "${name}" in "${scope.path}". Ensure parent ("${scope.path}") is object.`);
        }
        else {
            let pathToSet = scope.string;
            if(name) pathToSet = isRootProperty ? name : `${scope.string}.${name}`;
                
            if(isDuplicateProperty(obj, pathToSet)) {
                errors.push(`Property at path "${pathToSet}" is duplicated.`);
            } 
            else if (hasNoPropertyName(pathToSet)) {
                errors.push(`Property name not set for ${segments.join('+')}.`);
            }
            else if (config.generation.reservedKeywords.includes(name)) {
                errors.push(`"${pathToSet}" cannot be used as a property name, it is a reserved keyword.`);
            }
            else
                _.set(obj, pathToSet, value);
        }
    }
    else {
        errors.push(`Unable to create property "${name}" in "${scope.path}". Property type is not recognised or object is not initialised.`);
    }
};

const parentObjectExistsWhenNotRoot = (isRootProperty, value, propertyParent) => {
    return !isRootProperty && _.isObject(value) && !_.isObject(propertyParent);
}

const hasNoPropertyName = (pathToSet) => {
    return !pathToSet;
}

const isDuplicateProperty = (obj, pathToSet) => {

    const currentPropertyValue = _.get(obj, pathToSet, undefined);

    if(currentPropertyValue == undefined)
        return false;
    else if (_.isObject(currentPropertyValue) && _.isEmpty(currentPropertyValue))
        return false;
    else
        return true;
}

const getValue = function(segments, typeIndexes, getValueFromSegment, config) {

    let typeValue = getValueFromSegment ? helper.getSegmentAttribute(segments, typeIndexes, 'value') : undefined,
        propertyType = config.generation.propertyTypes[helper.getSegmentAttribute(segments, typeIndexes, 'type')];

    if(propertyType)
        return propertyType.defaultValue(typeValue);
    else
        return '';

};

module.exports = { set };