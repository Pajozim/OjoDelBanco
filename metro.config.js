const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('onnx');  // ← add onnx as asset

// Ensure .json files are handled correctly
config.resolver.assetExts = [...new Set([...config.resolver.assetExts, 'onnx', 'dict'])];

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });