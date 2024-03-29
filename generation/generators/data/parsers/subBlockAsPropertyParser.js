const scopeSvc = require('../services/dataScopingService'),
    propertySettingService = require('../services/dataSettingService'),
    helper = require('../services/dataHelper');

const segmentStructure = ['type', 'value', 'name'];
const segmentIndexes = {
    type: helper.getPropertyAttributeIndexFromEnd(segmentStructure, 'type'),
    value: helper.getPropertyAttributeIndexFromEnd(segmentStructure, 'value'),
    name: helper.getPropertyAttributeIndexFromEnd(segmentStructure, 'name'),
};

const isValid = function(segments)
{
    let subBlockIndicatorSegment = segments[segments.length - segmentIndexes.type];
    return segments.length >= segmentStructure.length && subBlockIndicatorSegment === 'subBlock';
};

const run = function(segments, object, config, errors)
{
    let scope = scopeSvc.get(segments, object, segmentStructure, config);
    object = scope.object;
    propertySettingService.set(object, segments, scope, segmentIndexes, true, config, errors);
};

module.exports= { isValid: isValid, run: run, structure: segmentStructure }

