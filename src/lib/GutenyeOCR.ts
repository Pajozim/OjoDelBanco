import Ocr from '@gutenye/ocr-react-native';

let ocrInstance: Ocr | null = null;

export async function getOcr(models: {
  detectionModelPath: string;
  recognitionModelPath: string;
  classifierModelPath: string;
  dictionaryPath: string;
}): Promise<Ocr> {
  if (ocrInstance) {
    return ocrInstance;
  }

  ocrInstance = await Ocr.create({
    ...models,
    isDebug: false,
    recognitionImageMaxSize: 480,
    detectionThreshold: 0.8,
    detectionBoxThreshold: 0.6,
    detectionUnclipRatiop: 1.8,
    detectionUseDilate: false,
    detectionUsePolygonScore: false,
    useDirectionClassify: false,
  });

  return ocrInstance;
}

export function destroyOcr() {
  ocrInstance = null;
}