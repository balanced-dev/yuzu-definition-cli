module.exports = () => {

    return {
        modules: [
            {
                name: 'yuzu',
                init: require('./config/yuzu')
            },
            {
                name: 'yuzu.vue',
                init: require('./config/yuzu.vue')
            }
        ]
    };

}