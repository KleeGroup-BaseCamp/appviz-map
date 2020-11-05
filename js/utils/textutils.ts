import p5 from "p5"
import {style} from "../sketch"

export class TextUtils {
    private static maxCharacters(text: string, width: number): number {
        let numOfCharacters: number = 1
        while (numOfCharacters < text.length
            && textWidth(text.slice(0, numOfCharacters)) < (width - textWidth("m"))) {
            numOfCharacters++
        }
        return numOfCharacters
    }

    public static buildDisplayableTitle(text: string, width: number, fontSize: number): string {
        const font : p5.Font = style.text.font
        push() // This function should not alter textSize
        textSize(fontSize)
        textFont(font)
        const numOfCharacters = TextUtils.maxCharacters(text, width)
        pop()
        return numOfCharacters == text.length
            ? text
            : text.slice(0, numOfCharacters - 3) + "..."
    }

    public static firstCharUpperCase(text: string): string  {
        return text[0].toUpperCase() + text.slice(1, text.length)
    }
}
