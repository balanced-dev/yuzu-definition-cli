
module.exports = (config) => {

    config.data = {
        settings: {
            fileExtension: '.json',
            subdirectory: ''
        }
    };

    config.creators.push({ name: 'data', module: require('../../creation/creators/data') });

};