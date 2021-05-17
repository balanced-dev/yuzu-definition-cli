module.exports = () => {

    return {
        modules: [
            {
                name: 'schema',
                init: require('./config/schema')
            }
        ]
    };

}