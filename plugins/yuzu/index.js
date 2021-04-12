module.exports = () => {

    return {
        modules: [
            {
                name: 'yuzu',
                init: require('./config/yuzu')
            }
        ]
    };

}