const _ = require('lodash'),
    scopeSvc = require('../services/dataScopingService'),
    dataSettingService = require('../services/dataSettingService'),
    helper = require('../services/dataHelper');

const segmentStructure = ['type', 'name'];
const segmentIndexes = {
    type: helper.getPropertyAttributeIndexFromEnd(segmentStructure, 'type'),
    name: helper.getPropertyAttributeIndexFromEnd(segmentStructure, 'name'),
};

const isValid = function(segments)
{
    return (segments.length > 1 && !_.includes(segments, 'subBlock'));
};

const run = function(segments, object, config)
{
    let scope = scopeSvc.get(segments, object, segmentStructure, config);
    object = scope.object;
    dataSettingService.set(object, segments, scope, segmentIndexes, false, config);
};

module.exports= { isValid: isValid, run: run, structure: segmentStructure}

