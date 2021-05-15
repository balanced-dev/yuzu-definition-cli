module.exports = () => {

    return {
        modules: [
            {
                name: 'prettier-css',
                init: require('./config/prettier-css')
            },
            {
                name: 'prettier-html',
                init: require('./config/prettier-html')
            },
            {
                name: 'prettier-js',
                init: require('./config/prettier-js')
            }
        ]
    };

}