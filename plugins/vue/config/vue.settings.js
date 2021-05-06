const configDefaults = require("../../../config/configDefaults");

const generateChildContext = function (options) {
  const Inflector = options.plugins.inflector;
  let lastArrayContext = options.plugins._.last(options.relativePath);
  return Inflector.singularize(lastArrayContext) !== lastArrayContext
    ? Inflector.singularize(lastArrayContext)
    : "item_" + options.absolutePath.length;
};

const getVuePartial = function (options) {
  const kebabCase = options.plugins.changeCase.paramCase;
  let hyphenatedPartial = kebabCase(options.value);
  let partialPrefix = options.prefixes.block.file + "-";
  hyphenatedPartial =
    hyphenatedPartial.substring(0, partialPrefix.length) === partialPrefix
      ? hyphenatedPartial.substring(partialPrefix.length)
      : hyphenatedPartial;
  return hyphenatedPartial;
};

const getLogic = function (options, d, showIf) {
    if (options.isArray) {
        var parentPath = options.arrayContext.join(".");
        return ` v-for="(${d.path}, index) in ${parentPath}" :key="index" `;
    }
    else if (showIf) {
        return ` v-if="${d.path}" `
    } 
    return ' ';
}

const common = (options) => {
  return {
    tag: options.markup.settings.defaultTag,
    path: options.relativePath.join("."),
    class: options.style.generateClassString(options),
  };
};

module.exports = (config) => {

  config.creators.push({
    name: 'script',
    module: require('../../../creation/creators/script')
  })

  config.script.settings.fileExtension = ".js";
  config.script.settings.initialScript = function (options) {
    return 'export default {\nprops: <!-- YUZU PROPS -->\n};';
  };

  config.markup.fragments.wrapperMarkupFragments = {
      array: {
        parentWrapperOpening: function (options) {
          let wrapperOptions = options.plugins._.cloneDeep(options);
          let childContext = generateChildContext(options);
          options.style.appendChildContextClass(options);

          let dp = common(wrapperOptions);
          let dc = common(options);

          let output =
            `<${dp.tag} class="${dp.class}" v-if="${dp.path} && ${dp.path}.length">\n` +
            `<${dc.tag} class="${dc.class}" v-for="(${childContext}, index) in ${dp.path}" :key="index">\n`;
          options.relativePath = [childContext];
          return output;
        },
        parentWrapperClosing: function (options) {
          let d = common(options);
          return `</${d.tag}>\n` + `</${d.tag}>\n`;
        },
        simpleTypeOpening: function (options) {
          let childContext = generateChildContext(options);
          let d = common(options.plugins._.cloneDeep(options));

          let output = `<${d.tag} class="${d.class}" v-if="${d.path} && ${d.path}.length">\n`;

          options.arrayContext = options.relativePath;
          options.relativePath = [childContext];
          return output;
        },
        simpleTypeClosing: function (options) {
          return (
            `</${options.markup.settings.defaultTag}>\n`
          );
        },
        dataStructuresOpening: function (options) {
          return this.simpleTypeOpening(options);
        },
        dataStructuresClosing: function (options) {
          return this.simpleTypeClosing(options);
        },
        dynamicRefsOpening: function (options) {
          return this.parentWrapperOpening(options);
        },
        dynamicRefsClosing: function (options) {
          return this.parentWrapperClosing(options);
        },
        refsOpening: function (options) {
          return this.simpleTypeOpening(options);
        },
        refsClosing: function (options) {
          return this.simpleTypeClosing(options);
        },
      },
      object: {
        openingTag: function (options) {
          return `<${
            options.markup.settings.defaultTag
          } class="${options.style.generateClassString(options)}">\n`;
        },
        closingTag: function (options) {
          return `</${options.markup.settings.defaultTag}>\n`;
        },
      },
    };
  config.markup.fragments.contentMarkupFragments = {
      dynamicSubBlockArray: function (options) {
        return `<component :is="${options.relativePath.join(
          "."
        )}._ref.replace('/par', '')" :key="index" v-bind="${options.relativePath.join(
          "."
        )}"></component>\n`;
      },
      namedSubBlockArray: function (options) {
        let d = common(options.plugins._.cloneDeep(options));
        const partialReference = getVuePartial(options);
        return `<${partialReference}${getLogic(options, d, true)}v-bind="${d.path}"></${partialReference}>\n`;
      },
      subBlockObject: function (options) {
        let d = common(options.plugins._.cloneDeep(options));
        const partialReference = getVuePartial(options);
        return `<${partialReference}${getLogic(options, d, true)}v-bind="${d.path}"></${partialReference}>\n`;
      },
      default: function (options) {
        let d = common(options.plugins._.cloneDeep(options));
        return (
          `<${d.tag} class="${d.class}"${getLogic(options, d, true)}>\n{{${d.path}}}\n</${d.tag}>\n`.replace(' >', '>')
        );
      },
    };
  config.markup.fragments.dataStructureMarkupFragments = {
      dataImage: function (options) {
        let relativePath = options.relativePath.join(".");
        return (
          `<picture v-if="${relativePath}.src" class="${options.style.generateClassString(
            options
          )}">\n` +
          `<img :src="${relativePath}.src" :alt="${relativePath}.alt">\n` +
          `</picture>\n`
        );
      },
      dataLink: function (options) {
        let d = common(options.plugins._.cloneDeep(options));

        var s =  (
          `<a${getLogic(options, d)}v-if="${d.path}.href && ${d.path}.label" class="${d.class}" :href="${d.path}.href" :title="${d.path}.title" :target="${d.path}.isNewTab ? '_blank' : false" :rel="${d.path}.isExternalLink ? 'noopener noreferrer' : false">\n` +
          `{{${d.path}.label}}\n` +
          `</a>\n`
        );

        return s;
      },
      dataForm: function (options) {
        return `<!-- Insert ${options.relativePath.join(".")} form here -->\n`;
      },
    };

    config.interceptorsPipeline.push({
      name: 'vue-single-file',
      apply: (interceptors, json, config) => {
          interceptors.script = function(script, cardSettings) {
    
            const schemaProcess = config.creators.find((item) => { return item.name == 'schema'; });
            if(schemaProcess) {
              let defaultSchema = schemaProcess.module.initialContent(cardSettings);
              let schema = config.generators.schemaCleanup.processProperties(defaultSchema, json);
              script = script.replace('<!-- YUZU PROPS -->', config.plugins.propsFromSchema(schema));
            }
    
            return script;
          } 
      }
  });

  config.createThese = ['markup', 'style', 'script']; 
  config.plugins._ = require("lodash");
  config.plugins.changeCase = require("change-case");
  config.plugins.inflector = require("inflector-js");
  config.plugins.propsFromSchema = require('../generation/plugins/vuePropsFromSchema');

};
