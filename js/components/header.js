class Header {
    #title
    #width
    #font
    #fontSize
    #textColor
    #underlineColor

    constructor(title, width, font, fontSize, textColor, underlineColor) {
        this.#title = title ? Utils.buildDisplayableTitle(title, width, fontSize) : "No title"
        this.#width = width
        this.#font = font
        this.#fontSize = fontSize
        this.#textColor = textColor
        this.#underlineColor = underlineColor
    }

    render() {
        noStroke()
        fill(this.#textColor)
        textSize(this.#fontSize)
        textFont(this.#font)
        textAlign(CENTER)
        text(this.#title, 0, textAscent() + 15, this.#width)
        //--- underline
        stroke(this.#underlineColor)
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}