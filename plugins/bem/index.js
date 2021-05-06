module.exports = () => {

    return {
        modules: [
            {
                name: 'bem.scss',
                init: require('./config/bem.scss')
            }
        ]
    };

}