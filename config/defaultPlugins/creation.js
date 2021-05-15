module.exports = (config) => {

  config.creation = {
    blockPaths : {
      page: {
        path: "/pages/",
      },
      block: {
        path: "/components/",
      },
      layout: {
        path: "/layouts/",
      },
    }
  };

  config.interceptorsPipeline = [];
  config.createThese = [];
  config.creators = [];

  config.resetInterceptorsOfType = (type) => {
    config.interceptorsPipeline = config.interceptorsPipeline.filter((i) => {
      return i.type != type;
    });
  };
  
};
