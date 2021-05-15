module.exports = () => {

    return {
        modules: [
            {
                name: 'hbs.settings',
                init: require('./config/hbs.settings')
            },
            {
                name: 'hbs.prettier',
                init: require('./config/hbs.prettier')
            }
        ]
    };

}