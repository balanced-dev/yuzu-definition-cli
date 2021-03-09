const run = function(lines) {
    let htmlString = '';

    for (let i = 0, len = lines.length; i < len; i++) {
        htmlString += lines[i] + '\n';
    }

    return htmlString;
};

module.exports = {run};