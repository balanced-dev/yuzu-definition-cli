const log = [];
const assert = require('assert'),
    should = require('should'),
    base = require('./base.js')(log);

const simplePropertyStructure = base.structures.simpleProperty,
    subBlockAsObjectStructure = base.structures.subBlockAsObject,
    subBlockAsPropertyStructure = base.structures.subBlockAsProperty;

const testBuildLocation = function(location, jsonObject) {
    return base.scopingService.buildLocation(location, jsonObject);
}

const testRemoveUnwantedPropertyAttributes = function(location, structure, settings) {
    return base.scopingService.removeUnwantedPropertyAttributes(location, structure, settings);
}

describe('base', function() {

    describe('data unit tests', function() {	
            
        it('[buildLocation()] - Should add to an empty object', function() {

            let output = testBuildLocation(["productName"], {});
            output.string.should.equal('productName');
        });		

        it('[buildLocation()] - Should add to a nested object', function() {

            let output = testBuildLocation(
                    ["productSpecifications", "weightKg"], 
                    {
                        productName: "",
                        productSpecifications: {}
                    }
                );

            output.string.should.equal('productSpecifications.weightKg');
        });		

        it('[buildLocation()] - Should add to the first element of an array', function() {

            let output = testBuildLocation(
                    ["productOptions", "colours"],
                    {
                        productName: "",
                        productSpecifications: {
                            weightKg: 0
                        },
                        productOptions: [
                            {}
                        ]
                    }
                );

            output.string.should.equal('productOptions[0].colours');
        });	

        it('[removeUnwantedPropertyAttributes()] - Return root path for simple property', function() {

            let output = testRemoveUnwantedPropertyAttributes(["backgroundColour"], simplePropertyStructure, base.settings);

            output.length.should.equal(0);
        });		

        it('[removeUnwantedPropertyAttributes()] - Return root path for property with type', function() {

            let output = testRemoveUnwantedPropertyAttributes(["string", "backgroundColour"], simplePropertyStructure, base.settings);

            output.length.should.equal(0);
        });		

        it('[removeUnwantedPropertyAttributes()] - Return path for nested property', function() {

            let location = ["item", "list", "integer", "id"],
                output = testRemoveUnwantedPropertyAttributes(location, simplePropertyStructure, base.settings);
            
            output.length.should.equal(2);
            output[0].should.equal(location[0]);
            output[1].should.equal(location[1]);
        });

        it('[removeUnwantedPropertyAttributes()] - Return root path for subBlock', function() {

            let output = testRemoveUnwantedPropertyAttributes(["subBlock", "parContentSummary", "contentSummary"], subBlockAsPropertyStructure, base.settings);

            output.length.should.equal(0);
        });

        it('[removeUnwantedPropertyAttributes()] - Return path for nested subBlock', function() {

            let location = ["contentSummaries", "subBlock", "parContentSummary", "contentSummary"],
                output = testRemoveUnwantedPropertyAttributes(location, subBlockAsPropertyStructure, base.settings);
            
            output.length.should.equal(1);
            output[0].should.equal(location[0]);
        });
            
        it('[removeDataStructureRefs()] - Should replace all "$ref": "/data{Structure}" references', function() {

            let output = base.svc.removeDataStructureRefs(
                {
                    "logo": {
                        "$ref": "/dataImage"
                    },
                    "logoTest": {
                        "$ref": "/dataImageNew"
                    },
                    "links": [
                        {
                            "$ref": "/dataLink"
                        }
                    ],
                    "bannerImages": [
                        {
                            "image": {
                                "$ref": "/dataImage"
                            },
                            "link": {
                                "$ref": "/dataLink"
                            }
                        }
                    ],
                    "searchForm": {
                        "$ref": "/dataForm"
                    }
                },
                base.settings
            );
            assert.deepEqual(output,
                {
                    "logo": {
                        "src": "",
                        "alt": "",
                        "height": 0,
                        "width": 0
                    },
                    "logoTest": {
                        "$ref": "/dataImageNew"
                    },
                    "links": [
                        {
                            "label": "",
                            "href": "#",
                            "title": "",
                            "isNewTab": false,
                            "isExternalLink": false,
                            "iconName": "",
                            "isActive": false
                        }
                    ],
                    "bannerImages": [
                        {
                            "image": {
                                "src": "",
                                "alt": "",
                                "height": 0,
                                "width": 0
                            },
                            "link": {
                                "label": "",
                                "href": "#",
                                "title": "",
                                "isNewTab": false,
                                "isExternalLink": false,
                                "iconName": "",
                                "isActive": false
                            }
                        }
                    ],
                    "searchForm": {
                        "testForm": {}
                    }
                }
            );
        });		
    })
});
