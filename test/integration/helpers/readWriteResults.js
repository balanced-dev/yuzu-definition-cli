const fs = require('fs');
const path = require('path');

let resultsDir = '';
const actualSuffix = 'actual';
const expectedSuffix = 'expected';

const deleteFile = (testName, actualSuffix, lang, ext) => {
    var filename = `${resultsDir}${path.sep}${lang}${path.sep}${testName}_${actualSuffix}.${ext}`;
    if(fs.existsSync(filename)) fs.unlinkSync(filename);
};

const write = (testName, content, suffix, lang, ext) => {
    fs.writeFileSync(`${resultsDir}${path.sep}${lang}${path.sep}${testName}_${suffix}.${ext}`, content);
}

const read = (testName, suffix, lang, ext) => {
    return fs.readFileSync(`${resultsDir}${path.sep}${lang}${path.sep}${testName}_${suffix}.${ext}`, 'utf8');
}

module.exports = (lang, ext) => {

    return {
        setupOutputDir: (...args) => {
            resultsDir = path.resolve(...args);
        },
        deleteActual: (testName) => deleteFile(testName, actualSuffix, lang, ext),
        writeActual: (testName, content) => write(testName, content, actualSuffix, lang, ext),
        writeExpected: (testName, content) => write(testName, content, expectedSuffix, lang, ext),
        readExpected: (testName) => read(testName, expectedSuffix, lang, ext),
    }

}