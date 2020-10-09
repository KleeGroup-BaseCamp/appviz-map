class VText {
    #text
    #font
    #fontSize
    #color

    constructor(text, font, fontSize, color = style.getTextColor()) {
        this.#text = text
        this.#font = font
        this.#fontSize = fontSize
        this.#color = color
    }

    render() {
        noStroke()
        fill(this.#color)
        textSize(this.#fontSize)
        textFont(this.#font)
        text(this.#text, 0, 0)
    }
}