class Item extends Element {
    #width
    #height
    #title
    id

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.#title = title ? Utils.buildDisplayableTitle(title, width, style.text.size.s) : "No title"
        this.id = title // Temp
    }

    render() {
        fill(style.getShapeFill("item", (state.selectedElement === this) ? "hover" : "default"))
        rect(0, 0, this.#width, this.#height)
        fill(255)
        textSize(style.text.size.s)
        textAlign(CENTER, CENTER)
        text(this.#title, 0, 0, this.#width, this.#height)
    }
    contains(x, y) {
        return x > 0
            && x < this.#width
            && y > 0
            && y < this.#height
    }
}