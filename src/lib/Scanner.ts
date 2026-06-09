import * as ImagePicker from 'expo-image-picker';
import { StateSetterBundle } from '../components/Text-Input-Items';
import { Asset } from 'expo-asset';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { getOcr } from './GutenyeOCR';
import postProcessing from './postprocess';

export default async function ReaderForTransfer({setFullName, setAlias, setClabe, setAmount, setImageURI}: StateSetterBundle): Promise<void> {

  // No permissions request is necessary for launching the image library.
  // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
  // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
  // so the app users aren't surprised by a system dialog after picking a video.allCharacters
  // See "Invoke permissions for videos" sub section for more details.
  const permissionResult = await ImagePicker.getCameraPermissionsAsync();
  if (!permissionResult.granted) {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      console.error('Permission not granted. Aborting ...');
      return;
    }
  }

  const takenImage = await ImagePicker.launchCameraAsync({allowsEditing: true});
  if (takenImage.canceled) {
    console.error('Cancelled', 'You did not select an image.');
    return;
  }

  const result = takenImage ?? await ImagePicker.getPendingResultAsync();
  // No pending result
  if (result === null) {
    console.error('No pending result', 'Try again.');
    return;
  }
  // Error occurred
  else if (result && 'code' in result && 'message' in result) {
    console.error('Error', result.message as string);
  }
  // User cancelled (or success with assets)
  else if (result.canceled) {
    console.error('Cancelled', 'You did not select an image.');
    return;
  }

  const ImgURI = result.assets[0].uri;
  if (!ImgURI) {
      alert('Internal error. Please try again. If the problem persists, contact support.');
      return;        
  }

  // --- https://github.com/gutenye/ocr

  // Model & Char Dict Paths
  const detModel: Asset = await Asset.fromModule(require('../../assets/models/ch_PP-OCRv4_det_infer.onnx')).downloadAsync();
  const recModel: Asset = await Asset.fromModule(require('../../assets/models/ch_PP-OCRv4_rec_infer.onnx')).downloadAsync();
  const charDictAsset: Asset = await Asset.fromModule(require('../../assets/models/character_dict.dict')).downloadAsync();

  const stripFileUri = (uri: string) => uri.replace(/^file:\/\//, '');

  try {

    // Image Manipulation
    const context = ImageManipulator.manipulate(ImgURI);
    context.resize({ width: 1000 });
    const renderedImage = await context.renderAsync();
    const resizedImg = await renderedImage.saveAsync({
      format: SaveFormat.JPEG,
      compress: 1,
    });

    // global garbage collection
    if (global.gc) global.gc();

    // starting gutenyeOCR
    const ocr = await getOcr({
      detectionModelPath: stripFileUri(detModel.localUri || detModel.uri),
      recognitionModelPath: stripFileUri(recModel.localUri || recModel.uri),
      classifierModelPath: stripFileUri(recModel.localUri || recModel.uri),
      dictionaryPath: stripFileUri(charDictAsset.localUri || charDictAsset.uri),
    });
    const readResult = await ocr.detect(stripFileUri(resizedImg.uri));

    const onlyText: string[] = readResult.map((item) => item.text)

    // Post Processing
    const pp = postProcessing(onlyText);

    // Set values
    setFullName(pp["name"]);
    setAlias(pp["alias"]);
    setClabe(pp["clabe"]);
    setAmount(pp["amount"]);
    
    // Set image for display on the transfer page
    setImageURI(resizedImg.uri);

  } catch (e: any) {
    console.error('Image resizing or GutenOCR failed:', e.message);
  }

  return;
}