const parsers = [
    require('./schemaRefProperties/schemaRefPropertyObject'),
    require('./schemaRefProperties/schemaRefPropertyArray'),
    require('./schemaRefProperties/schemaRefArray'),
    require('./schemaArrays/schemaArrayType'),
    require('./schemaArrays/schemaArrayProperties'),
    require('./schemaObjects/schemaObjectProperties'),
];

const scopers = [
    require('./scopers/schemaArrayScope'),
    require('./scopers/schemaObjectScope'),
];

const processProperties = function(schema, data) {    
    for(let property in schema.properties) {
        let properties = schema.properties !== undefined ? schema.properties : schema,
            value = properties[property];

        scopers.forEach(function(scoping) {
            if(scoping.isValid(property, value, data[property])) {
                let fragment = scoping.run(properties, property, data[property]);
                processProperties(fragment.schema, fragment.data);
            }
        });

        parsers.forEach(function(parser) {
            if(!parser.isValid(property, value, data[property])) {
                parser.run(properties, property, data[property]);
            }
        });
    }

    return schema;
}

module.exports = { processProperties };