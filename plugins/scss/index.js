module.exports = () => {

    return {
        modules: [
            {
                name: 'scss.bem',
                init: require('./config/scss.bem')
            }
        ]
    };

}