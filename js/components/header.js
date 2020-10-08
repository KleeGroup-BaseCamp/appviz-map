class Header {
    #title
    #width
    #strokeColor
    #fontSize

    constructor(title, width, fontSize, strokeColor) {
        this.#title = title ? Utils.buildDisplayableTitle(title, width, style.getFontSize(fontSize)) : "No title"
        this.#width = width
        this.#fontSize = fontSize
        this.#strokeColor = strokeColor
    }

    render() {
        noStroke()
        fill(style.getTextFill())
        textSize(style.getFontSize(this.#fontSize))
        textFont(style.getFont(false))
        textAlign(CENTER)
        text(this.#title, 0, textAscent() + 15, this.#width)
        //--- underline
        stroke(this.#strokeColor)
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}