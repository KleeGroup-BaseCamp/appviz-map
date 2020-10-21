export default class VText {
    #text
    #font
    #fontSize
    #color

    constructor(text, font, fontSize, color = style.text.color.primary) {
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

    setText(text){
        this.#text = text
    }
}