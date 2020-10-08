class VText {
    #text
    #x
    #y
    #font
    #fontSize
    #color

    constructor(text, x, y, font, fontSize, color = 255) {
        this.#text = text
        this.#x = x
        this.#y = y
        this.#font = font
        this.#fontSize = fontSize
        this.#color = color
    }

    render() {
        noStroke()
        fill(this.#color)
        textSize(this.#fontSize)
        textFont(this.#font)
        text(this.#text, this.#x, this.#y)
    }
}