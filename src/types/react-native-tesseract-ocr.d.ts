declare module 'react-native-tesseract-ocr' {

  export const LANG_ENGLISH = "eng";
  export const LANG_SPANISH = "spa";

  export interface RecognizedText {
    readonly blocks: Array<Block>;
    readonly confidence: number;
    readonly text: string;
  }

  export interface Block {
    readonly boundingBox: BoundingBox;
    readonly confidence: number;
    readonly lines: Array<Line>;
    readonly text: string;
  }

  export interface BoundingBox {
    readonly height: number;
    readonly left: number;
    readonly top: number;
    readonly width: number;
  }

  export interface Line {
    readonly boundingBox: BoundingBox;
    readonly confidence: number;
    readonly text: string;
    readonly words: Array<Word>;
  }

  export interface Word {
    readonly boundingBox: BoundingBox;
    readonly confidence: number;
    readonly text: string;
  }

  export interface TesseractOptions {
    allowlist?: string;
    denylist?: string;
    level?: 'symbol' | 'block' | 'line' | 'paragraph' | 'word'
  }

  export function recognize(
    imageSource: string,
    lang: string,
    tessOptions?: TesseractOptions | null
  ): Promise<string>;

  export default {
    recognize
  };
}
