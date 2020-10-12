class Header {
    #title
    #width
    #height
    #fontSize

    constructor(title, width, height, fontSize) {
        this.#title = title ? TextUtils.buildDisplayableTitle(title, width, fontSize) : "No title"
        this.#width = width
        this.#height = height
        this.#fontSize = fontSize
    }

    render() {
        this.#renderBackground()
        this.#renderTitle()
  //      this.#renderUnderline()
    }

    #renderBackground() {
        noStroke()
        fill(style.color.front)
        rect (0, 0, this.#width, this.#height)
    }

    #renderTitle() {
        noStroke()
        fill(style.text.color.primary)
        textSize(this.#fontSize)
        textFont(style.text.font)
        textAlign(CENTER)
        text(this.#title, 0, textAscent() + 15, this.#width)
    }

/*    #renderUnderline() {
        stroke(this.#color)
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
*/    
}