class ItemTypeDetail extends Element {
    #width
    #height
    #header

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.#header = new Header(title, width, "l"/*fontSize*/, 255)
        this.title = this.title ? Utils.buildDisplayableTitle(this.title, this.#width, style.getFontSize("l")) : "No title"
    }

    render() {
        this.#renderRectangle()
        this.#header.render()
    }

    #renderRectangle() {
        strokeWeight(1)
        stroke(255)
        fill([100, 100, 200])
        rect(0, 0, this.#width, this.#height)
    }
}