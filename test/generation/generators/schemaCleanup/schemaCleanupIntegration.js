const assert = require('assert'),
    rewire = require('rewire'),
    svc = rewire('../../../../generation/generators/schemaCleanup/schemaCleanup.js');

describe('Schema cleanup integration tests', function() {	
        
    
	it('Never adds schema line', function() {	
    
        let schemaFragment = {
            "properties": 
            {
                "background": {
                    "type": "object",
                    "properties": {
                        "$ref": {
                            "type": "string",
                            "minLength": 1
                        }
                    },
                    "required": [
                        "$ref"
                    ]
                }
            }
        };

        let data = {
            "background": {
                "$ref": "/parDataImage"
            }
        }

        let shouldbe = {
            "properties": {
                "background": {
                    "$ref": "/parDataImage"
                }
            }
        }

        let output = svc.processProperties(schemaFragment, data);

        assert.deepStrictEqual(output, shouldbe);

    });

    it('Clean array properties', function() {	
    
        let schemaFragment = {
            "properties": {
                "contentSummaries": {
                    "type": "array",
                    "uniqueItems": true,
                    "minItems": 1,
                    "items": {
                        "required": [],
                        "properties": {
                            "contentSummary": {
                                "$ref": "/parContentSummary"
                            }
                        }
                    }
                }
            }
        };

        let data = {
            "contentSummaries": [
                {
                    "contentSummary": {
                        "$ref": "/parContentSummary"
                    }
                }
            ]
        }

        let shouldbe = {
            "properties": {
                "contentSummaries": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "contentSummary": {
                                "$ref": "/parContentSummary"
                            }
                        }
                    }
                }
            }
        }

        let output = svc.processProperties(schemaFragment, data);


        assert.deepStrictEqual(output, shouldbe);

    });

    it('Clean object properties', function() {	
    
        let schemaFragment = {
            "properties": {
                "product": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "link": {
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                                "text": {
                                    "type": "string"
                                },
                                "href": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "text",
                                "href"
                            ]
                        }
                    },
                    "required": [
                        "id",
                        "link"
                    ]
                }
            }
        };

        let data = {
            "product": {
                "id": "",
                "link": {
                    "text": "",
                    "href": ""
                }
            }
        }

        let shouldbe = {
            "properties": {
                "product": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "link": {
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                                "text": {
                                    "type": "string"
                                },
                                "href": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }

        let output = svc.processProperties(schemaFragment, data);

        assert.deepStrictEqual(output, shouldbe);

    });

    it('Creates correct array items property type', function() {	
    
        let schemaFragment = {
            "properties": {
                "decimals": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {}
                    }
                },
                "wholeNumbers": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {}
                    }
                },
                "words": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {}
                    }
                }
            }
        };

        let data = {
            "decimals": [
                1.1
            ],
            "wholeNumbers": [
                5
            ],
            "words": [
                "Hello there!"
            ]
        };

        let shouldbe = {
            "properties": {
                "decimals": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "wholeNumbers": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "words": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        };

        let output = svc.processProperties(schemaFragment, data);
        assert.deepStrictEqual(output, shouldbe);

    });

    it('Creates anyOf', function() {	
    
        let schemaFragment = {
            "properties": {
                "gridRows": {
                    "type": "array",
                    "items": {
                        "$ref": {
                            "type": "string",
                            "minLength": 1
                        }
                    }
                }
            }
        };

        let data = {
            "gridRows": [
                {
                    "$ref": "/parHeaderRow"
                },
                {
                    "$ref": "/parContentRow"
                },
                {
                    "$ref": "/parFooterRow"
                }
            ]
        };

        let shouldbe = {
            "properties": {
                "gridRows": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "/parHeaderRow"
                            },
                            {
                                "$ref": "/parContentRow"
                            },
                            {
                                "$ref": "/parFooterRow"
                            }
                        ]
                    }
                }
            }
        };

        let output = svc.processProperties(schemaFragment, data);
        assert.deepStrictEqual(output, shouldbe);

    });

    it('Complete test', function() {	
    
        let schemaFragment = {
            "properties": {
                "contentRows": {
                    "type": "array",
                    "uniqueItems": true,
                    "minItems": 1,
                    "items": {
                        "required": [
                            "$ref"
                        ],
                        "properties": {
                            "$ref": {
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                }
            }
        };

        let data = {
            "contentRows": [
                {
                    "$ref": "/parDataRowItem"
                }
            ]
        }

        let shouldbe = {
            "properties": {
                "contentRows": {
                    "type": "array",
                    "items": {
                        "$ref": "/parDataRowItem"
                    }
                }
            }
        }

        let output = svc.processProperties(schemaFragment, data);

        assert.deepStrictEqual(output, shouldbe);

    });

	

});