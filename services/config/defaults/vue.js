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
  let partialPrefix = options.prefixes.block.fileName + "-";
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
    tag: options.markupSettings.defaultMarkupTag,
    path: options.relativePath.join("."),
    class: options.plugins.buildClass.run(options),
  };
};

module.exports = {
  cardSource: "",
  yuzuPro: {
    key: "",
  },
  trello: {
    list: "",
    board: "",
    key: "",
    secret: "",
  },
  localFiles: {
    directoryPath: "./blockGeneration",
  },
  dataSettings: {},
  styleSettings: {
    generateSeparateFile: true,
  },
  schemaSettings: {
    generateSeparateFile: true,
  },
  blockPaths: {
      page: { 
          path: '/_dev/_templates/pages'
      },
      block: { 
          path: '/_dev/_templates/blocks'
      },
      layout: { 
          path: '/_dev/_templates/_layouts'
      }
  },
  prefixes: {
    block: {
      card: "Block - ",
      file: "par",
    },
    page: {
      card: "Page - ",
    },
    schema: {
      card: "Schema",
    },
    property: {
      card: "- ",
    },
  },
  markupFragments: {
    wrapperMarkupFragments: {
      array: {
        parentWrapperOpening: function (options, propertyCount) {
          let wrapperOptions = options.plugins._.cloneDeep(options);
          let childContext = generateChildContext(options);
          options.plugins.buildClass.addChildClass(options);

          let dp = common(wrapperOptions);
          let dc = common(options);

          let output =
            `<${dp.tag} class="${dp.class}" v-if="${dp.path} && ${dp.path}.length">\n` +
            `<${dc.tag} class="${dc.class}" v-for="(${childContext}, index) in ${dp.path}" :key="index">\n`;
          options.relativePath = [childContext];
          return output;
        },
        parentWrapperClosing: function (options, propertyCount) {
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
            `</${options.markupSettings.defaultMarkupTag}>\n`
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
            options.markupSettings.defaultMarkupTag
          } class="${options.plugins.buildClass.run(options)}">\n`;
        },
        closingTag: function (options) {
          return `</${options.markupSettings.defaultMarkupTag}>\n`;
        },
      },
    },
    contentMarkupFragments: {
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
    },
    dataStructureMarkupFragments: {
      dataImage: function (options) {
        let relativePath = options.relativePath.join(".");
        return (
          `<picture v-if="${relativePath}.src" class="${options.plugins.buildClass.run(
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
    },
  },
  markupSettings: {
    defaultMarkupTag: "div",
    classNameDivider: "__",
    indentSize: 4,
    backupRefArrayChildClass: "item",
    fileExtension: ".vue",
    initialStyle: function(options) {
      return `.${options.className} {\n\n}`
    },
    initialMarkup: function (options) {
      return `<script>\nexport default {\nprops: <!-- YUZU PROPS -->\n};\n</script>\n<template>\n<div class=\"${options.className}\">\n<!-- YUZU MARKUP -->\n</div>\n</template>\n<style lang="scss">\n<!-- YUZU STYLE -->\n</style>\n`;
    },
  },
  dataStructures: {
    dataImage: {
      src: "",
      alt: "",
      height: 0,
      width: 0,
    },
    dataLink: {
      label: "",
      href: "#",
      title: "",
      isNewTab: false,
      isExternalLink: false,
      iconName: "",
      isActive: false,
    },
    dataForm: {
      testForm: {},
    },
  },
  cardSources: {
    trello: require("../../plugins/cardSources/trello.js"),
    localFiles: require("../../plugins/cardSources/localFiles.js")
  },
  processors: {
    directories: require('../../directories'),
    data: require('../../data'),
    markup: require('../../markup'),
    scss: require('../../scss'),
    schema: require('../../schema') 
  },
  processThese: ['directories','data', 'markup'],
  getInterceptors: function(json, config, data, schemaCleanup, markup, scss) {

    const sccsProcess = config.processors['schema'];
    const prettier = require("prettier");

    return {        
      data: function() {
          return data.removeDataStructureRefs(json, config); 
      },
      dataForSchemaGeneration: json,
      markup: function(html, cardSettings) {
          let markupGeneration = markup.run(html, cardSettings, json, config);
          
          let defaultScss = config.markupSettings.initialStyle(cardSettings);
          let style = scss.run(defaultScss, cardSettings, markupGeneration.content, config);
          let output =  markupGeneration.full.replace('<!-- YUZU STYLE -->', style);

          let defaultSchema = sccsProcess.initialContent(cardSettings);
          let schema = schemaCleanup.processProperties(defaultSchema, json);
          output = output.replace('<!-- YUZU PROPS -->', config.plugins.propsFromSchema(schema));

          output = prettier.format(output, { semi: false, tabWidth: 4, parser: "vue" });

          return output;
      }
    }

  },
  plugins: {
    _: require("lodash"),
    changeCase: require("change-case"),
    inflector: require("inflector-js"),
    buildClass: require("../../plugins/style/buildClass"),
    propsFromSchema: require('./vue/vuePropsFromSchema')
  }

};
