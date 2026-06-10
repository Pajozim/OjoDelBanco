const cmakePath = 'node_modules/@gutenye/ocr-react-native/android/CMakeLists.txt';
if (fs.existsSync(cmakePath)) {
  let cmake = fs.readFileSync(cmakePath, 'utf8');
  let changed = false;

  // Make ReactAndroid optional
  if (cmake.includes('find_package(ReactAndroid REQUIRED CONFIG)')) {
    cmake = cmake.replace('find_package(ReactAndroid REQUIRED CONFIG)', 'find_package(ReactAndroid CONFIG)');
    changed = true;
    console.log('Applied: ReactAndroid optional');
  }

  // Add JSI include path
  const jsiInclude = '  ${CMAKE_SOURCE_DIR}/../../../react-native/ReactCommon/jsi';
  if (!cmake.includes(jsiInclude)) {
    cmake = cmake.replace('include_directories(', `include_directories(\n${jsiInclude}`);
    changed = true;
    console.log('Applied: JSI include path');
  }

  // Remove ReactAndroid::jsi link target
  if (cmake.includes('ReactAndroid::jsi')) {
    cmake = cmake.replace(/\s*ReactAndroid::jsi/g, '');
    changed = true;
    console.log('Applied: removed ReactAndroid::jsi');
  }

  // Remove ReactAndroid::reactnativejni link target
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

  // Verify
  const verify = fs.readFileSync(cmakePath, 'utf8');
  console.log('reactnativejni still present:', verify.includes('ReactAndroid::reactnativejni'));
  console.log('jsi still present:', verify.includes('ReactAndroid::jsi'));
}