const fs = require('fs');
const path = require('path');

function patch(filePath, from, to) {
  const full = path.resolve(filePath);
  if (!fs.existsSync(full)) {
    console.warn(`Skipping patch, file not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(full, 'utf8');
  if (content.includes(to)) {
    console.log(`Already patched: ${filePath}`);
    return;
  }
  if (!content.includes(from)) {
    console.warn(`Patch target not found in: ${filePath}`);
    return;
  }
  fs.writeFileSync(full, content.replace(from, to));
  console.log(`Patched: ${filePath}`);
}

// @gutenye/ocr-react-native - use new arch react-android artifact
patch(
  'node_modules/@gutenye/ocr-react-native/android/build.gradle',
  'implementation "com.facebook.react:react-native:+"',
  'implementation "com.facebook.react:react-android"'
);

// react-native-css-interop - remove worklets babel plugin
patch(
  'node_modules/react-native-css-interop/babel.js',
  '"react-native-worklets/plugin",',
  '// "react-native-worklets/plugin",'
);

// @gutenye/ocr-react-native - fix CMakeLists for new arch
const cmakePath = 'node_modules/@gutenye/ocr-react-native/android/CMakeLists.txt';
if (fs.existsSync(cmakePath)) {
  let cmake = fs.readFileSync(cmakePath, 'utf8');
  let changed = false;

  if (cmake.includes('find_package(ReactAndroid REQUIRED CONFIG)')) {
    cmake = cmake.replace('find_package(ReactAndroid REQUIRED CONFIG)', 'find_package(ReactAndroid CONFIG)');
    changed = true;
    console.log('Applied: ReactAndroid optional');
  }

  if (cmake.includes('ReactAndroid::reactnativejni')) {
    cmake = cmake.replace(/\s*ReactAndroid::reactnativejni/g, '');
    changed = true;
    console.log('Applied: removed ReactAndroid::reactnativejni');
  }

  if (changed) {
    fs.writeFileSync(cmakePath, cmake, 'utf8');
    console.log('Patched: CMakeLists.txt');
  } else {
    console.log('Already patched: CMakeLists.txt');
  }

  const verify = fs.readFileSync(cmakePath, 'utf8');
  console.log('reactnativejni still present:', verify.includes('ReactAndroid::reactnativejni'));
  console.log('jsi still present:', verify.includes('ReactAndroid::jsi'));
  console.log('CMakeLists.txt content:\n', verify);
} else {
  console.warn('CMakeLists.txt not found at:', cmakePath);
}

console.log('Native patches applied');