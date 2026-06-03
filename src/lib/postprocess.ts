export default function postProcessing(readText: string[]): Record<string, string> {
    const inputFields: Record<string, string> = {"name": "", "alias": "", "clabe": "", "amount": ""}

    readText.forEach((text) => {
        if ((text.match(/[a-zA-Z]/g) || []).length > (text.match(/[0-9]/g) || []).length) { // if there are more letters than digits
            inputFields["name"] += text + " ";
        } else {
            if (/[,.$]/.test(text)) {
                inputFields["amount"] = text; // if there is a comma or a dot or a peso symbol, should be the amount
            }
            else if (/[-_\s]/.test(text)) inputFields["clabe"] = text.replace(/\D/g, "");
            else inputFields["clabe"] = text;
        }
    })

    return inputFields;
} 