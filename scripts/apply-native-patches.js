const fs = require('fs');
const path = require('path');

function patch(filePath, from, to) {
  const full = path.resolve(filePath);
  if (!fs.existsSync(full)) {
    console.warn(`Skipping patch, file not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(full, 'utf8');
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

// expo-modules-core - fix compose compiler version
patch(
  'node_modules/expo-modules-core/android/build.gradle',
  '"1.9.25": "1.5.15"',  // verify this is still the right target
  '"1.9.25": "1.5.15"'   // no-op if already correct
);

console.log('Native patches applied');