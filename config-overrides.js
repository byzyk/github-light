const { getLoader } = require('react-app-rewired');
const tsImportPluginFactory = require('ts-import-plugin');
const rewireLess = require('react-app-rewire-less');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');

const THEME_PATH = './src/assets/styles/theme.less';

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader'),
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        }),
      ],
    }),
  };

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: lessToJs(fs.readFileSync(THEME_PATH, 'utf8')),
  })(config, env);

  return config;
};
