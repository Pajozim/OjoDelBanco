interface FileSystemAdapter {
  readAsStringAsync(uri: string, options: { encoding: 'utf8' | 'base64' }): Promise<string>;
}

interface OcrConfig {
  detModelPath: string | number;        // Path or require() result (number) for detection model
  recModelPath: string | number;        // Path or require() result (number) for recognition model
  characterDictPath?: string;           // File path to character dictionary JSON (use fileSystemAdapter)
  characterDict?: string[];             // Character dictionary as array (use this with require() for JSON)
  fileSystemAdapter?: FileSystemAdapter; // Required for file URI/characterDictPath access
}

interface OcrResult {
  box: {
    points: Point[];
    score: number;
  };
  text: string;
  confidence: number;
}