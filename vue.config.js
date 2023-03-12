const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const TSCONFIG_PATH = path.resolve(__dirname, "./tsconfig.prod.json");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .merge({
        options: {
          configFile: TSCONFIG_PATH,
        },
      });

    config.plugin("fork-ts-checker").tap(args => {
      args[0].typescript.configFile = TSCONFIG_PATH;
      return args;
    });
  },
});
