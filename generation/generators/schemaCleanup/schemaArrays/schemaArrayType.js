const isValid = function (property, value, dataPropertyValue) {
    let isArray = value.type == 'array';
    let isItemsEmpty = value.items && value.items.properties && Object.keys(value.items.properties).length === 0;
    let isDataPopulated = dataPropertyValue.length > 0;
    
    return !(isArray && isItemsEmpty && isDataPopulated);
};

const run = function (schemaProperties, propertyName, dataPropertyValue) {
    let value = dataPropertyValue[0];
    let dataType = 'string';
    let type = typeof value;

    if(type === 'number') {
        dataType = value % 1 != 0 ? 'number': 'integer';
    }

    schemaProperties[propertyName] = {
        type: "array",
        items: {
            type: dataType
        }
    };

    return schemaProperties;
};

module.exports = { isValid, run };