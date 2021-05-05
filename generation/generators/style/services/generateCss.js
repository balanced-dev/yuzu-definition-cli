const run = function(css, classNameArray, settings) {
    classNameArray.forEach((className, index) => {
        const openingTag = '.' + className + ' {';
        let contentTags = '\n\n';
        let closingTag = '}';
        closingTag += index < classNameArray.length - 1 ? '\n\n' : '';

        css += openingTag + contentTags + closingTag;        
    });  

    return css;
};

module.exports = {run};