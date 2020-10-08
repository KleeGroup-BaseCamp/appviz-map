class Header {
    #title
    #width
    #font
    #fontSize
    #strokeColor

    constructor(title, width, font, fontSize, strokeColor) {
        this.#title = title ? Utils.buildDisplayableTitle(title, width, style.getFontSize(fontSize)) : "No title"
        this.#width = width
        this.#font = font
        this.#fontSize = fontSize
        this.#strokeColor = strokeColor
    }

    render() {
        noStroke()
        fill(style.getTextFill())
        textSize(style.getFontSize(this.#fontSize))
        textFont(this.#font)
        textAlign(CENTER)
        text(this.#title, 0, textAscent() + 15, this.#width)
        //--- underline
        stroke(this.#strokeColor)
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}