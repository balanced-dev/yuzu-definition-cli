module.exports = () => {

    return {
        modules: [
            {
                name: 'scss',
                init: require('./config/scss')
            }
        ]
    };

}