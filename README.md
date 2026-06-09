# Ojo del Banco

A banking app module that extracts a handwritten transaction data placard and automatically populates the read data into the corresponding input fields. Currently optimized for Mexican banking formats.

<video src="https://github.com/user-attachments/assets/979f7035-adc3-43c8-acfe-ef993b1e5973" width="90%" controls autoplay muted loop></video>

---
# Motivation

Impetus:
In Mexico, small-scale vendors often exclude modern digital payments because the commissions on credit, debit, and NFC transactions carve into their already thin profit margins. This forces them to remain cash-only or to rely on direct bank transfers which require manual entries by the buyer.

Implementation:
I built Ojo del Banco to streamline the completion of a direct transfer protocol. An on-device GutenyeOCR (PaddleOCR and ONNX Runtime) module scans handwritten CLABE numbers and beneficiary names into the banking app's input fields. The user verifies the information before submitting the transaction data.

---

## Quick Start

### Android 
Download and install the latest **[.apk file here](https://github.com/your-username/your-repo/releases)** to run the demo app directly on your device. Go to "Transfer" and click on "use Scanner" to have the full experience of gutenyeOCR/paddleOCR and ONNX-runtime module.

Notes:
- Security Warnings: Most Android phones will block "Unknown Apps" by default. You might want to activate "Allow from this source" in the settings to install it. Alternative would be online emulators (e.g.: appetize.io).
- iOS Limitations: Keep in mind that a "standalone" file for iOS users (like an .ipa) is not easy because of Apple's code-signing restrictions. 

### Development Setup
If you want to run the app from the source code:
1. `npm/bun install` (note: There were changes done in some of the node_modules - see: ./patches)
2. `npx/bunx expo prebuild`
3. `npx/bunx expo run:android`
(!!!!!!!!!!!!!!!! TEST IT BEFORE TEST IT BEFORE TEST IT BEFORE !!!!!!!!!!!!!!!!)

---

## Usage

- Customization:
1. Image format (only JPEG or PNG) or manipulation demands can be changed on block "// Image Manipulation" in:
> `./src/lib/OCR_&_ONNX.ts`

2. Knowing there are some pattern that can be implemented in post-processing (after text extraction from photograph):
`./src/lib/postprocess.ts`

- Localization:
1. The module is currently optimized for the Mexican market. To support other regions, update the character dictionary at:
>`./assets/models/character_dict.dict.`
or
>`./assets/models/___character_dict copy.json` (original file as backup)

- Performance Tuning:
1. Depending on how the results come out (i.e. the accuracy of extracting text of a photograph), you may change the parameters in:
>`./src/lib/GutenyeOCR.ts`

Legend (([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#platform-specific-options))):
    -+ isDebug: false,
        ==> enables debug logging and output (default: false)
    
    -+ recognitionImageMaxSize: 480,       
        ==> maximum width for the recognition model input (default: 480)
        ==> controls the maximum width of images fed to the recognition model
        ==> larger values improve accuracy but slow down processing
        ==> the system resizes images to fit within this limit while maintaining aspect ratio
        ==> used in the image preprocessing stage before text recognition

    -+ detectionThreshold: 0.8,
        ==> minimum confidence threshold for text detection (default: 0.3)
        ==> minimum confidence level for detecting text regions
        ==> lower values detect more text but may include false positives
        ==> higher values are more selective but might miss some text
        ==> applied during the thresholding step that converts probability maps to binary images

    -+ detectionBoxThreshold: 0.6,
        ==> threshold for the text boxes (default: 0.5)
        ==> confidence threshold for individual text bounding boxes
        ==> filters out low-confidence text regions after initial detection
        ==> works alongside detectionThreshold to refine results
        ==> used when scoring and filtering detected text boxes

    -+ detectionUnclipRatiop: 1.8,
        ==> Unclip ratio for detection boxes (default: 1.6)
        ==> controls how much to expand detected text boxes
        ==> helps capture text that might be cut off at the edges
        ==> higher values capture more context but may include unwanted areas
        ==> applied during the "unclip" operation that expands bounding boxes

    -+ detectionUseDilate: false,
        ==> Whether to use dilation in the detection process (default: false)
        ==> whether to apply dilation (expansion) to text regions
        ==> can help connect broken text fragments
        ==> useful for text with poor spacing or disconnected characters
        ==> pplied to the binary image before finding text contours

    -+ detectionUsePolygonScore: false,
        ==> Whether to use polygon score in detection (default: false)
        ==> method for calculating confidence scores of text regions
        ==> polygon score considers the actual shape of text regions
        ==> alternative is faster box-based scoring
        ==> affects which text regions pass the confidence threshold

    -+ useDirectionClassify: false,
        ==> Whether to use the direction classification model (default: true)
        ==> enables automatic text direction detection and correction
        ==> rotates text that appears sideways or upside down
        ==> adds processing time but improves accuracy for mixed-orientation text
        ==> applied to each detected text region before recognition


- Model Configuration:
>`./src/lib/GutenyeOCR.ts`

Legend (([gutenyeOCR deepwiki](https://deepwiki.com/gutenye/ocr/6.1-configuration-options#core-configuration-options))):
    -+ detectionModelPath: string; 
        ==> path to the detection model file (.onnx)
    -+ recognitionModelPath: string; 
        ==> path to the recognition model file (.onnx)
    -+ classifierModelPath: string; 
        ==> default is: ch_ppocr_mobile_v2.0_cls_infer.onnx
        ==> when You Need It:
            - using the React Native implementation
            - explicitly providing custom model paths (instead of using defaults)
            - planning to enable the useDirectionClassify option for text orientation detection
    -+ dictionaryPath: string; 
        ==> path to the character dictionary file (.txt | .dict)

when different models were implemented, then changes has to be hardcoded on "// starting gutenyeOCR" in:
>`./src/lib/Scanner.ts`

- UI & UX Customization:
>`./src/components/`
>`./src/context/`


---

## Contributing


to continue on:

Roadmap:
- enabling generated QR codes by the vendors for phone to phone handshake
- enabling a NFC pipeline
- displaying the recognized bank (and verifying the bank via text extraction)

Credits:
- https://github.com/jvittor1/nubank-clone
- https://github.com/gutenye/ocr




17.03.: 
- installing nubank clone from https://github.com/jvittor1/nubank-clone.git

19.03.: 
- modifying the UI of nubank clone (some design and all text translated into english)
- creation of a transfer route (i.e. /(auth)/transfer/index.tsx)
- setting up a fake-balance.tsx with React Context and Context.Provider
OjodBanco Demonstration
23.03.:
- transfer route only via Transfer (disabled the other items)

24.03.:
- Back/Cancel "possibility" on a transfer route/page
- modifications of TextCard, Card and Button
- creating and refining TextInput
- restructuring and reinstalling from nubank-clone to OjoDelBanco

25.03.:
- rebuilding the eas ojo del banco app

26./27.03.:
- debugging tries to TypeScript linter

30.03.:
- setting textinput styles and properties
- fixing transfer layout index scroll offset
- 1/2: updating fake balance by amount from transfer

01.04.:
- 2/2: completing the deduction field when amount is typed in (extending and correcting fake-balance.tsx)

02.04.:
- implementing a submit button
- 1/2: implementing an error function (f.e. clabe has no 18 digits) and its styles

06.04.:
- 2/2: implementing an error function (f.e. clabe has no 18 digits), a feedback for incorrect input
- reformatting CLABE value with hyphens (discarded)

07.04.:
- informing about Tesseract only to discover that react-native and tesseract don't work so well together
- getting started up about a learning program ML KIT Text Recognition, only to see it fail on AStudio, because of version incompabilities (Gradle, JVM, Java, SDK-versions)
- 1/3 CamScan code: first code of expo-image-picker

09.04.:
- 2/3 CamScan code: evolution of expo-image-picker, resolving and at last omitting react-native hooks, restrucuring expo-image-picker commands
- 3/3 CamScan code: issue with linking (ML KIT Text Recognition v2, supposedly Expo Go do not allow) 

10.04.:
- migrating to development build (outside of Expo Go), issues with detecting phone (cause: usb-c cable seems disfunctional)
- version issues while building app, finally solved
- first test result show: lack of training data?

13, 14, 15.04.:
- testing and searching for performant OCR text and numbers recognizers (Tesseract, ML KIT TextRec v2, ExecuTorch useOCR & useVericalOCR), but resulting in maximal 50% accuracy

Then ship it. You've done serious engineering work here:

    Native C++ patching for RN 0.76 compatibility
    Solved std::bad_alloc with image resizing and a singleton pattern
    Full on-device OCR with no data leaving the phone
    Compared two OCR engines and picked the better one

That's well beyond what a typical capstone demonstrates. The one wrong character in a name field is an acceptable limitation to document in your README.

Make sure your GitHub repo tells this story - a good README covering:

    What the app does
    The on-device OCR approach and why (privacy)
    The technical challenges you solved
    Known limitations

That's the kind of project that stands out to employers.
- Back/Cancel "possibility" on a transfer route/page
- modifications of TextCard, Card and Button
- creating and refining TextInput
- restructuring and reinstalling from nubank-clone to OjoDelBanco

25.03.:
- rebuilding the eas ojo del banco app

26./27.03.:
- debugging tries to TypeScript linter

30.03.:
- setting textinput styles and properties
- fixing transfer layout index scroll offset
- 1/2: updating fake balance by amount from transfer

01.04.:
- 2/2: completing the deduction field when amount is typed in (extending and correcting fake-balance.tsx)

02.04.:
- implementing a submit button
- 1/2: implementing an error function (f.e. clabe has no 18 digits) and its styles

06.04.:
- 2/2: implementing an error function (f.e. clabe has no 18 digits), a feedback for incorrect input
- reformatting CLABE value with hyphens (discarded)

07.04.:
- informing about Tesseract only to discover that react-native and tesseract don't work so well together
- getting started up about a learning program ML KIT Text Recognition, only to see it fail on AStudio, because of version incompabilities (Gradle, JVM, Java, SDK-versions)
- 1/3 CamScan code: first code of expo-image-picker

09.04.:
- 2/3 CamScan code: evolution of expo-image-picker, resolving and at last omitting react-native hooks, restrucuring expo-image-picker commands
- 3/3 CamScan code: issue with linking (ML KIT Text Recognition v2, supposedly Expo Go do not allow) 

10.04.:
- migrating to development build (outside of Expo Go), issues with detecting phone (cause: usb-c cable seems disfunctional)
- version issues while building app, finally solved
- first test result show: lack of training data?

13, 14, 15.04.:
- testing and searching for performant OCR text and numbers recognizers (Tesseract, ML KIT TextRec v2, ExecuTorch useOCR & useVericalOCR), but resulting in maximal 50% accuracy

Then ship it. You've done serious engineering work here:

    Native C++ patching for RN 0.76 compatibility
    Solved std::bad_alloc with image resizing and a singleton pattern
    Full on-device OCR with no data leaving the phone
    Compared two OCR engines and picked the better one

That's well beyond what a typical capstone demonstrates. The one wrong character in a name field is an acceptable limitation to document in your README.

Make sure your GitHub repo tells this story - a good README covering:

    What the app does
    The on-device OCR approach and why (privacy)
    The technical challenges you solved
    Known limitations

That's the kind of project that stands out to employers.
