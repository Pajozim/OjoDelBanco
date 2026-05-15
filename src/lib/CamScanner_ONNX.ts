import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform, NativeModules } from 'react-native';
import { StateSetterBundle } from '../components/Text-Input-Items';
import Ocr from '@gutenye/ocr-react-native';
import { Asset } from 'expo-asset';

export default async function ReaderForTransfer({setFullName, setAlias, setClabe, setAmount}: StateSetterBundle): Promise<void> {
  // Load onnxruntime dynamically to avoid crash if native module is missing
  let ort: any = null;
  try {
    if (Platform.OS !== 'web') {
      // Check if the native module exists before requiring
      if (NativeModules.Onnxruntime) {
        ort = require('onnxruntime-react-native');
      } else {
        Alert.alert('Onnxruntime native module not found. Some OCR features may not work.');
      }
    }
  } catch (e) {
    Alert.alert('Failed to load onnxruntime-react-native:', JSON.stringify(e));
  }

  // No permissions request is necessary for launching the image library.
  // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
  // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
  // so the app users aren't surprised by a system dialog after picking a video.allCharacters
  // See "Invoke permissions for videos" sub section for more details.
  const permissionResult = await ImagePicker.getCameraPermissionsAsync();
  if (!permissionResult.granted) {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission not granted. Aborting ...');
      return;
    }
  }

  const takenImage = await ImagePicker.launchCameraAsync({allowsEditing: true});
  if (takenImage.canceled) {
    Alert.alert('Cancelled', 'You did not select an image.');
    return;
  }

  const result = takenImage ?? await ImagePicker.getPendingResultAsync();
  // No pending result
  if (result === null) {
    Alert.alert('No pending result', 'Try again.');
    return;
  }
  // Error occurred
  else if (result && 'code' in result && 'message' in result) {
    Alert.alert('Error', result.message as string); // ✅
  }
  // User cancelled (or success with assets)
  else if (result.canceled) {
    Alert.alert('Cancelled', 'You did not select an image.');
    return;
  }

  const ImgURI = result.assets[0].uri;
  if (!ImgURI) {
      alert('Internal error. Please try again. If the problem persists, contact support.');
      return;        
  }

  // --- https://github.com/gutenye/ocr

  console.log("Ante GutenOCR'S -- Image URI", ImgURI);

  const detModel: Asset = await Asset.fromModule(require('../assets/models/ch_PPOCRv3_det_infer.onnx')).downloadAsync();
  const recModel: Asset = await Asset.fromModule(require('../assets/models/ch_PPOCRv3_rec_infer.onnx')).downloadAsync();
  const charDict = require('../assets/models/character_dict.json');

  //const charDict = await getDictionaryUri();

  try {
    const ocr = await Ocr.create({
      models: {
        detectionPath: detModel.uri,
        recognitionPath: recModel.uri,
        dictionaryPath: charDict,
      },
      isDebug: true,
      recognitionImageMaxSize: 320,
      detectionThreshold: 0.8,
      detectionBoxThreshold: 0.6,
      detectionUnclipRatiop: 1.5,
      detectionUseDilate: false,
      detectionUsePolygonScore: false,
      useDirectionClassify: false
    });
    const readResult = await ocr.detect(ImgURI);
    const onlyText = readResult.map((item) => item.text)
    console.log("GutenOCR result", onlyText.join(' '));
  } catch (e: any) {
    console.error('GutenOCR failed:', e.message);
  }

  return;
}