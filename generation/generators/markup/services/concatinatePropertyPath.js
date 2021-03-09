const concatinatePropertyPath = function(pathArray) {
    return Array.isArray(pathArray) ? pathArray.join('.') : pathArray;
};

module.exports = concatinatePropertyPath;