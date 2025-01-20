/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Add SVG transformer configuration
const { transformer, resolver } = config

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  getTransformOptions: async () => ({
    transform: {
      // Inline requires are very useful for deferring loading of large dependencies/components.
      // For example, we use it in app.tsx to conditionally load Reactotron.
      // However, this comes with some gotchas.
      // Read more here: https://reactnative.dev/docs/optimizing-javascript-loading
      // And here: https://github.com/expo/expo/issues/27279#issuecomment-1971610698
      inlineRequires: true,
    },
  }),
}

// Configure SVG support
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
}

// This helps support certain popular third-party libraries
// such as Firebase that use the extension cjs.
config.resolver.sourceExts.push("cjs")

// Wrap the config with Reanimated's Metro config
const wrappedConfig = wrapWithReanimatedMetroConfig(config)

module.exports = wrappedConfig
