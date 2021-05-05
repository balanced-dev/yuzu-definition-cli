const run = function(scss, obj, settings) {    
    for (const key in obj) {
        const openingTag = '&' + settings.style.settings.classNameDivider + key + ' {';
        let contentTags = '\n\n';
        const closingTag = '}\n';

        scss += openingTag;

        if (obj.hasOwnProperty(key)) {
            const value = obj[key];   
            
            // If object or array
            if(Object.keys(value).length > 0) {
                contentTags += run('', value, settings);
            }
        }

        scss += contentTags;
        scss += closingTag;
    }

    return scss;
};

module.exports = {run};