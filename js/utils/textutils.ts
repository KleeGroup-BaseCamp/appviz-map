import {style} from "../sketch"

export default class TextUtils {
    private static maxCharacters(text: string, width: number) {
        let numOfCharacters = 1
        while (numOfCharacters < text.length
            && textWidth(text.slice(0, numOfCharacters)) < (width - textWidth("m"))) {
            numOfCharacters++
        }
        return numOfCharacters
    }

    static buildDisplayableTitle(text: string, width: number, fontSize: number, font = style.text.font) {
        push() // This function should not alter textSize
        textSize(fontSize)
        textFont(font)
        const numOfCharacters = TextUtils.maxCharacters(text, width)
        pop()
        return numOfCharacters == text.length
            ? text
            : text.slice(0, numOfCharacters - 3) + "..."
    }

    static firstCharUpperCase(text: string) {
        return text[0].toUpperCase() + text.slice(1, text.length)
    }
}
