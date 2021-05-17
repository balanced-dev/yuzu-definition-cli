module.exports = (config) => {
  config.creators.push({ name: 'schema', module: require('../../../creation/creators/schema') });
};