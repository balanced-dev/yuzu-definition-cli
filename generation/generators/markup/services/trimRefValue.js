const run = function(value) {
    return value !== undefined && value.charAt(0) === '/' ? value.substr(1) : value
};

module.exports = {run};