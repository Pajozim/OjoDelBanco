# Ojo del Banco

A banking app module that extracts a handwritten transaction data placard and automatically populates the read data into the corresponding input fields. Currently optimized for Mexican banking formats.

<video src="https://github.com/user-attachments/assets/50805d54-90d8-4bb5-a1e1-d1ee328f64d5" width="90%" controls autoplay muted loop></video>

---
## Motivation

Impetus:
In Mexico, small-scale vendors often exclude modern digital payments because the commissions on credit, debit, and NFC transactions carve into their already thin profit margins. This forces them to remain cash-only or to rely on direct bank transfers which require manual entries by the buyer.

Implementation:
I built Ojo del Banco to streamline the completion of a direct transfer protocol. An on-device GutenyeOCR (PaddleOCR and ONNX Runtime) module scans handwritten CLABE numbers and beneficiary names into the banking app's input fields. The user verifies the information before submitting the transaction data.

---
## Quick Start

### Android 
Download and install the latest **[.apk file here](https://github.com/Pajozim/OjoDelBanco/releases/tag/apk-release)** to run the demo app directly on your device. Go to "Transfer" and click on "use Scanner" to have the full experience of gutenyeOCR/paddleOCR and ONNX-runtime module.

Notes: 
- Security Warnings: Most Android phones will block "Unknown Apps" by default. You might want to activate "Allow from this source" in the settings to install it. Alternative would be online emulators (e.g.: appetize.io).
- iOS Limitations: Keep in mind that a "standalone" file for iOS users (like an .ipa) is not easy because of Apple's code-signing restrictions. 

### Development Setup
If you want to run the app from the source code.

Prerequisites: [bun](https://bun.sh/) OR [npm](https://docs.npmjs.com/about-npm-versions#the-latest-release-of-npm)

CLI commands:

```bash
bun install
bunx expo prebuild
bunx expo run:android
```

(!!!!!!!!!!!!!!!! TEST IT BEFORE TEST IT BEFORE TEST IT BEFORE !!!!!!!!!!!!!!!!)

---
## Usage

### Customization:
- Image format (only JPEG or PNG) changes or manipulation demands can be changed on "// Image Manipulation" block in:
   
`./src/lib/OCR_&_ONNX.ts`

- Knowing there are some pattern that can be implemented in post-processing (after text extraction from photograph):
   
`./src/lib/postprocess.ts`

### Localization:
- The module is currently optimized for the Mexican market. To support other regions, update the character dictionary at:
   
`./assets/models/character_dict.dict.`

or

`./assets/models/___character_dict copy.json` (original file as backup)

### Performance Tuning:
- Depending on how the results come out (i.e. the accuracy of extracting text of a photograph), you may change the parameters in:
  
`./src/lib/GutenyeOCR.ts`

Legend ([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#platform-specific-options)):

    isDebug: false,
    : enables debug logging and output (default: false)
    
    recognitionImageMaxSize: 480,       
    : maximum width for the recognition model input (default: 480)
    : controls the maximum width of images fed to the recognition model
    : larger values improve accuracy but slow down processing
    : the system resizes images to fit within this limit while maintaining aspect ratio
    : used in the image preprocessing stage before text recognition

    detectionThreshold: 0.8,
    : minimum confidence threshold for text detection (default: 0.3)
    : minimum confidence level for detecting text regions
    : lower values detect more text but may include false positives
    : higher values are more selective but might miss some text
    : applied during the thresholding step that converts probability maps to binary images

    detectionBoxThreshold: 0.6,
    : threshold for the text boxes (default: 0.5)
    : confidence threshold for individual text bounding boxes
    : filters out low-confidence text regions after initial detection
    : works alongside detectionThreshold to refine results
    : used when scoring and filtering detected text boxes

    detectionUnclipRatiop: 1.8,
    : Unclip ratio for detection boxes (default: 1.6)
    : controls how much to expand detected text boxes
    : helps capture text that might be cut off at the edges
    : higher values capture more context but may include unwanted areas
    : applied during the "unclip" operation that expands bounding boxes

    detectionUseDilate: false,
    : Whether to use dilation in the detection process (default: false)
    : whether to apply dilation (expansion) to text regions
    : can help connect broken text fragments
    : useful for text with poor spacing or disconnected characters
    : applied to the binary image before finding text contours

    detectionUsePolygonScore: false,
    : Whether to use polygon score in detection (default: false)
    : method for calculating confidence scores of text regions
    : polygon score considers the actual shape of text regions
    : alternative is faster box-based scoring
    : affects which text regions pass the confidence threshold

    useDirectionClassify: false,
    : Whether to use the direction classification model (default: true)
    : enables automatic text direction detection and correction
    : rotates text that appears sideways or upside down
    : adds processing time but improves accuracy for mixed-orientation text
    : applied to each detected text region before recognition


### Model Configuration:

`./src/lib/GutenyeOCR.ts`

Legend (([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#core-configuration-options))):
    
    detectionModelPath: string; 
    : path to the detection model file (.onnx)
    recognitionModelPath: string; 
    : path to the recognition model file (.onnx)
    classifierModelPath: string; 
    : default is: ch_ppocr_mobile_v2.0_cls_infer.onnx
    : when You Need It:
        - using the React Native implementation
        - explicitly providing custom model paths (instead of using defaults)
        - planning to enable the useDirectionClassify option for text orientation detection
    dictionaryPath: string; 
    : path to the character dictionary file (.txt | .dict)

when different models were implemented, then changes has to be hardcoded on "// starting gutenyeOCR" block in:

`./src/lib/Scanner.ts`

### UI & UX Customization:

`./src/components/`
`./src/context/`


---
## Contributing

### Clone the repo

```bash
git clone https://github.com/yourusername/OjoDelBanco
cd OjoDelBanco
```

### Install dependencies

```bash
# npm install also works
bun install
```

### Run on Android

```bash
# npx expo prebuild / npx expo run:android also work
bunx expo prebuild
bunx expo run:android
```

### Submit a pull request

Fork the repository and open a pull request to the main branch.







to continue on:

Roadmap:
- enabling generated QR codes by the vendors for phone to phone handshake
- enabling a NFC pipeline
- displaying the recognized bank (and verifying the bank via text extraction)

Credits:
- nubank-clone UI: https://github.com/jvittor1/nubank-clone
- OCR integration: https://github.com/gutenye/ocr




Make sure your GitHub repo tells this story - a good README covering:

    What the app does
    The on-device OCR approach and why (privacy)
    The technical challenges you solved
    Known limitations

That's the kind of project that stands out to employers.
