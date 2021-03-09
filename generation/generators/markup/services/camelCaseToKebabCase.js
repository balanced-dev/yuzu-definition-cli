const run = function(camelCaseText) {
    return camelCaseText.split(/(?=[A-Z])/).join('-').toLowerCase();
};

module.exports = {run};