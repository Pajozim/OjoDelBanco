const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('onnx');  // ← add onnx as asset

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });