class Header {
    #title
    #width
    #font
    #fontSize
    #color

    constructor(title, width, font, fontSize, color) {
        this.#title = title ? TextUtils.buildDisplayableTitle(title, width, fontSize) : "No title"
        this.#width = width
        this.#font = font
        this.#fontSize = fontSize
        this.#color = color
    }

    render() {
        this.#renderTitle()
        this.#renderUnderline()
    }

    #renderTitle() {
        noStroke()
        fill(this.#color)
        textSize(this.#fontSize)
        textFont(this.#font)
        textAlign(CENTER)
        text(this.#title, 0, textAscent() + 15, this.#width)
    }

    #renderUnderline() {
        stroke(this.#color)
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}