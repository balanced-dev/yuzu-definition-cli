const run = function(scss, obj, settings) {    
    for (const key in obj) {
        let openingTag = '&' + settings.style.settings.classNameDivider + key + ' {',
            contentTags = '\n ',
            closingTag = '}';

        scss += openingTag;

        if (obj.hasOwnProperty(key)) {
            const value = obj[key];   
            
            // If object or array
            if(Object.keys(value).length > 0) {
                contentTags += run(contentTags, value, settings);
            }
        }

        scss += contentTags;
        scss += closingTag;
    }

    return scss;
};

module.exports = {run};