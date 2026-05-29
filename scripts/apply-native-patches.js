const fs = require('fs');
const path = require('path');

const rnocrSpecPath = path.join(
  __dirname,
  '../node_modules/@gutenye/ocr-react-native/android/src/main/java/com/ocr/RNOcrSpec.kt'
);

const content = `package com.ocr

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class RNOcrSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

  abstract fun install()
}
`;

fs.writeFileSync(rnocrSpecPath, content);
console.log('Native patches applied: RNOcrSpec.kt written');
