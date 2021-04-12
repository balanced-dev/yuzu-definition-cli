const svc = require('../../../../plugins/vue/generation/plugins/vuePropsFromSchema');
const assert = require('assert');
const should = require('should');

describe('vue props from schema tests', function() {


    it('get string prop', function() { simpleTypeTests('string', 'String') } );
    it('get number prop', function() { simpleTypeTests('number', 'Number') });
    it('get integer prop', function() { simpleTypeTests('integer', 'Number') });
    it('get boolean prop', function() { simpleTypeTests('boolean', 'Boolean') });
    it('get object prop', function() { simpleTypeTests('object', 'Object') });
    it('get array prop', function() { simpleTypeTests('array', 'Array') });

    it('get multiple props', function() { 

        var schema = {
            properties: {
               p1: { type: "string" },
               p2: { type: "object" }
           }
       }
    
       const output = svc(JSON.stringify(schema));
    
       output.should.equal(`{\n    p1: String,\n    p2: Object\n}`);

     });
    
});

const simpleTypeTests = (schemaType, vueType) => {
    var schema = {
        properties: {
           property: { type: schemaType }
       }
   }

   const output = svc(JSON.stringify(schema));

   output.should.equal(`{\n    property: ${vueType}\n}`);
}