Anno 2026

17.03.: 
- installing nubank clone from https://github.com/jvittor1/nubank-clone.git

19.03.: 
- modifying the UI of nubank clone (some design and all text translated into english)
- creation of a transfer route (i.e. /(auth)/transfer/index.tsx)
- setting up a fake-balance.tsx with React Context and Context.Provider

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