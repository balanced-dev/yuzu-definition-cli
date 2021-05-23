module.exports = (config) => {
  config.creators.push({ name: 'schema', module: require('../../../creation/creators/schema') });
  config.createThese.splice(0, 0, 'schema');
};