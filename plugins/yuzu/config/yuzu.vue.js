const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = (config) => {

  config.markup.fragments.contentMarkupFragments.dynamicSubBlockArray = function (options) {
    const path = options.relativePath.join(".");
    return `<component :is="${path}._ref.replace('/par', '')" :key="index" v-bind="${path}"></component>\n`;
  }

};