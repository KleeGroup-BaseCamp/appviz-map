class ItemTypeDetail extends Element {
    #width
    #height
    title

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.title = this.title ? Utils.buildDisplayableTitle(this.title, this.#width, style.getFontSize("l")) : "No title"
    }

    render() {
        this.#renderRectangle()
        this.#renderTitle()
        this.#renderBar()
    }

    #renderRectangle() {
        strokeWeight(1)
        stroke(255)
        fill([100, 100, 200])
        rect(0, 0, this.#width, this.#height)
    }

    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("l"))
        textFont(style.getFont(true))
        textAlign(CENTER);
        text(this.title, 0, textAscent() + 15, this.#width)
    }

    #renderBar() {
        stroke(255)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}