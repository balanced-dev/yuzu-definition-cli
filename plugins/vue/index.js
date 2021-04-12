module.exports = () => {

    return {
        modules: [
            {
                name: 'vue.settings',
                init: require('./config/vue.settings')
            },
            {
                name: 'vue.single-file-component',
                init: require('./config/vue.single-file-component')
            }
        ]
    };

}