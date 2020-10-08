class Utils {
    static #maxCharacters(text, width) {
        let numOfCharacters = 1;
        while (numOfCharacters < text.length
            && textWidth(text.slice(0, numOfCharacters)) < (width - textWidth("m"))) {
            numOfCharacters++;
        }
        return numOfCharacters;
    }

    static buildDisplayableTitle(text, width, fontSize) {
        push() // This function should not alter textSize
        textSize(fontSize)
        const numOfCharacters = Utils.#maxCharacters(text, width);
        pop()
        return numOfCharacters == text.length
            ? text
            : text.slice(0, numOfCharacters - 3) + "...";
    }

    static firstCharUpperCase(text) {
        return text[0].toUpperCase() + text.slice(1, text.length);
    }
}
