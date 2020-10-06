class Utils {
    static #maxCharacters(text, width) {
        let numOfCharacters = 1;
        while (numOfCharacters < text.length
            && textWidth(text.slice(0, numOfCharacters)) < (width - textWidth("m"))) {
            numOfCharacters++;
        }
        return numOfCharacters;
    }

    static buildDisplayableTitle(text, width) {
        const numOfCharacters = Utils.#maxCharacters(text, width);
        return numOfCharacters == text.length
            ? text
            : text.slice(0, numOfCharacters - 3) + "...";
    }

    static firstCharUpperCase(string) {
        return string[0].toUpperCase() + string.slice(1, string.length);
    }
}
