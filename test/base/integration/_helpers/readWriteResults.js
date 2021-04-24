const fs = require('fs');
const path = require('path');

let resultsDir = '';
const actualSuffix = 'actual';
const expectedSuffix = 'expected';

const deleteFile = (testName, actualSuffix, ext) => {
    var filename = `${resultsDir}${path.sep}${testName}_${actualSuffix}.${ext}`;
    if(fs.existsSync(filename)) fs.unlinkSync(filename);
};

const write = (testName, content, suffix, ext) => {
    fs.writeFileSync(`${resultsDir}${path.sep}${testName}_${suffix}.${ext}`, content);
}

const read = (testName, suffix, ext) => {
    return fs.readFileSync(`${resultsDir}${path.sep}${testName}_${suffix}.${ext}`, 'utf8');
}

module.exports = (ext) => {

    return {
        setupOutputDir: (dirs) => {
            const relative = path.join.apply(null, dirs)
            resultsDir = path.resolve(relative);
        },
        deleteActual: (testName) => deleteFile(testName, actualSuffix, ext),
        writeActual: (testName, content) => write(testName, content, actualSuffix, ext),
        writeExpected: (testName, content) => write(testName, content, expectedSuffix, ext),
        readExpected: (testName) => read(testName, expectedSuffix, ext),
    }

}