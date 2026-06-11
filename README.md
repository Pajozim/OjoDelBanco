# Ojo del Banco

A banking app module that extracts a handwritten transaction data placard and automatically populates the read data into the corresponding input fields. Currently optimized for Mexican banking formats.

<video src="https://github.com/user-attachments/assets/50805d54-90d8-4bb5-a1e1-d1ee328f64d5" width="90%" controls autoplay muted loop></video>

---
## Motivation

Impetus:
In Mexico, small-scale vendors often exclude modern digital payments because the commissions on credit, debit, and NFC transactions carve into their already thin profit margins. This forces them to remain cash-only or to rely on direct bank transfers which require manual entries by the buyer.

Implementation:
I built Ojo del Banco to streamline the completion of a direct transfer protocol. An on-device (keyword: privacy) GutenyeOCR module scans handwritten CLABE numbers and beneficiary names into the banking app's input fields. The user verifies the information before submitting the transaction data.

---
## Quick Start

### Android 
Download and install the latest **[.apk file here](https://github.com/Pajozim/OjoDelBanco/releases/tag/apk-release)** to run the demo app directly on your device. Go to "Transfer" and click on "use Scanner" to have the full experience of gutenyeOCR/paddleOCR and ONNX-runtime module.

Notes:
Security Warnings: Most Android phones will block "Unknown Apps" by default. You might want to activate "Allow from this source" in the settings to install it. Alternative would be online emulators (e.g.: appetize.io).
iOS Limitations: Keep in mind that a "standalone" file for iOS users (like an .ipa) is not easy because of Apple's code-signing restrictions. 

### Development Setup
If you want to run the app from the source code, jump to [Contributing](#contributing) section.

---
## Usage

### Customization:
Image format (only JPEG or PNG) changes or manipulation demands can be changed on "*// Image Manipulation*" block in: <br> `./src/lib/OCR_&_ONNX.ts`

Knowing there are some pattern that can be implemented in post-processing (after text extraction from photograph): <br> `./src/lib/postprocess.ts`

### Localization:
The module is currently optimized for the Mexican market. To support other regions, update the character dictionary at: <br> `./assets/models/character_dict.dict.` <br> or <br> `./assets/models/___character_dict copy.json` (original file as backup)

### Performance Tuning:
Depending on how the results come out (i.e. the accuracy of extracting text of a photograph), you may change the parameters in: <br> `./src/lib/GutenyeOCR.ts`

Legend ([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#platform-specific-options)):

`isDebug: false,`
<br> &nbsp; &nbsp;: enables debug logging and output (default: false)

`recognitionImageMaxSize: 480,`
<br> &nbsp; &nbsp;: maximum width for the recognition model input (default: 480)
<br> &nbsp; &nbsp;: controls the maximum width of images fed to the recognition model
<br> &nbsp; &nbsp;: larger values improve accuracy but slow down processing
<br> &nbsp; &nbsp;: the system resizes images to fit within this limit while maintaining aspect ratio
<br> &nbsp; &nbsp;: used in the image preprocessing stage before text recognition

`detectionThreshold: 0.8,`
<br> &nbsp; &nbsp;: minimum confidence threshold for text detection (default: 0.3)
<br> &nbsp; &nbsp;: minimum confidence level for detecting text regions
<br> &nbsp; &nbsp;: lower values detect more text but may include false positives
<br> &nbsp; &nbsp;: higher values are more selective but might miss some text
<br> &nbsp; &nbsp;: applied during the thresholding step that converts probability maps to binary images

`detectionBoxThreshold: 0.6,`
<br> &nbsp; &nbsp;: threshold for the text boxes (default: 0.5)
<br> &nbsp; &nbsp;: confidence threshold for individual text bounding boxes
<br> &nbsp; &nbsp;: filters out low-confidence text regions after initial detection
<br> &nbsp; &nbsp;: works alongside detectionThreshold to refine results
<br> &nbsp; &nbsp;: used when scoring and filtering detected text boxes

`detectionUnclipRatiop: 1.8,`
<br> &nbsp; &nbsp;: Unclip ratio for detection boxes (default: 1.6)
<br> &nbsp; &nbsp;: controls how much to expand detected text boxes
<br> &nbsp; &nbsp;: helps capture text that might be cut off at the edges
<br> &nbsp; &nbsp;: higher values capture more context but may include unwanted areas
<br> &nbsp; &nbsp;: applied during the "unclip" operation that expands bounding boxes

`detectionUseDilate: false,`
<br> &nbsp; &nbsp;: Whether to use dilation in the detection process (default: false)
<br> &nbsp; &nbsp;: whether to apply dilation (expansion) to text regions
<br> &nbsp; &nbsp;: can help connect broken text fragments
<br> &nbsp; &nbsp;: useful for text with poor spacing or disconnected characters
<br> &nbsp; &nbsp;: applied to the binary image before finding text contours

`etectionUsePolygonScore: false,`
<br> &nbsp; &nbsp;: Whether to use polygon score in detection (default: false)
<br> &nbsp; &nbsp;: method for calculating confidence scores of text regions
<br> &nbsp; &nbsp;: polygon score considers the actual shape of text regions
<br> &nbsp; &nbsp;: alternative is faster box-based scoring
<br> &nbsp; &nbsp;: affects which text regions pass the confidence threshold

`useDirectionClassify: false,`
<br> &nbsp; &nbsp;: Whether to use the direction classification model (default: true)
<br> &nbsp; &nbsp;: enables automatic text direction detection and correction
<br> &nbsp; &nbsp;: rotates text that appears sideways or upside down
<br> &nbsp; &nbsp;: adds processing time but improves accuracy for mixed-orientation text
<br> &nbsp; &nbsp;: applied to each detected text region before recognition


### Model Configuration:

`./src/lib/GutenyeOCR.ts`

Legend ([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#core-configuration-options)):
    
`detectionModelPath: string;`
<br> &nbsp; &nbsp;: path to the detection model file (.onnx)

`recognitionModelPath: string;`
<br> &nbsp; &nbsp;: path to the recognition model file (.onnx)

`classifierModelPath: string;`
<br> &nbsp; &nbsp;: default is: ch_ppocr_mobile_v2.0_cls_infer.onnx
<br> &nbsp; &nbsp;: when You Need It:
    - using the React Native implementation
    - explicitly providing custom model paths (instead of using defaults)
    - planning to enable the useDirectionClassify option for text orientation detection
    
`dictionaryPath: string;`
<br> &nbsp; &nbsp;: path to the character dictionary file (.txt | .dict)

when different models were implemented, then changes has to be hardcoded on "*// starting gutenyeOCR*" block in: <br> `./src/lib/Scanner.ts`

### UI & UX Customization: 
`./src/components/` <br> `./src/context/`


---
## Contributing

### Clone the repo

```bash
git clone https://github.com/yourusername/OjoDelBanco
cd OjoDelBanco
```

### Install dependencies

Prerequisites: [bun](https://bun.sh/) OR [npm](https://docs.npmjs.com/about-npm-versions#the-latest-release-of-npm)

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

---
## Limitations
**Mobile compute limits** – On‑device model size is bounded by phone CPU/RAM and thermal constraints. Large or ensemble models are not feasible locally and would require cloud offloading.

---
## Credits
**nubank-clone UI & UX:** https://github.com/jvittor1/nubank-clone <br>
**OCR integration:** https://github.com/gutenye/ocr
