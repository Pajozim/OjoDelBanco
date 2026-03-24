declare module 'react-native-tesseract-ocr' {
  export function recognize(
    imagePath: string,
    language: string[],
    options?: object
  ): Promise<string>;
  
  export function useEventListener(event: string, listener: (event: T) => void): void;

  export const LANG_ENGLISH = 'eng';
  export const LANG_SPANISH = 'spa';
}