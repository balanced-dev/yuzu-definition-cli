

module.exports = (schemaString) => {

    const schema = JSON.parse(schemaString);
    let output = '{\n';
    let count = 1;
    const keys = Object.keys(schema.properties);

    keys.forEach(key => {
        
        var p = schema.properties[key];

        output = `${output}    ${key}: `

        if(p.type === 'string') {
            output = output + 'String';
        }
        else if(p.type === 'number') {
            output = output + 'Number';
        }   
        else if(p.type === 'integer') {
            output = output + 'Number';
        }    
        else if(p.type === 'boolean') {
            output = output + 'Boolean';
        }  
        else if(p.type === 'array') {
            output = output + 'Array';
        }  
        else if(p.type === 'object') {
            output = output + 'Object';
        }  

        if(count < keys.length)
            output = output + ',';

        output = output + '\n';

        count ++;

    });

    output = output + '}';

    return output;

}