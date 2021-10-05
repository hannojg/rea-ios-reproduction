// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const originalTransformer = defaultConfig.transformer.getTransformOptions;
defaultConfig.transformer.getTransformOptions = async () => {
  let transformConfig = {};
  if (typeof originalTransformer === "function") {
    transformConfig = (await originalTransformer()) || {};
  }
  transformConfig.transform = {
    ...(transformConfig.transform || {}),
    inlineRequires: true,
  }

  return transformConfig;
}

module.exports = defaultConfig;