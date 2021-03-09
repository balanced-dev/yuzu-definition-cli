const getPropertyAttributeIndexFromEnd = function(structure, section) {
    return structure.length - structure.indexOf(section);
}

const getSegmentAttribute = function(segments, indexes, attribute) {
    return segments[segments.length - indexes[attribute]];
}

module.exports= { getSegmentAttribute, getPropertyAttributeIndexFromEnd  }