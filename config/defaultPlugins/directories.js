
module.exports = (config) => {

    config.createThese.push('directories');
    config.directories = {
        settings: {
            createForComponent: true
        }
    }

    config.creators.push({ 
        name: 'directories', 
        module: require('../../creation/creators/directories') 
    });

};