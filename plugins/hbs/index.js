module.exports = () => {

    return {
        modules: [
            {
                name: 'hbs.settings',
                init: require('./config/hbs.settings')
            }
        ]
    };

}