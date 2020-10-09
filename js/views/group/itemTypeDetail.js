class ItemTypeDetail extends Element {
    #width
    #height
    #header

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.#header = new Header(
            title, 
            width, 
            style.icon.font, 
            style.text.size.l, 
            style.text.color,
            )
    }

    render() {
        this.#renderBackground()
        this.#header.render()
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill(style.getShapeFill("itemTypeDetail"))
        rect(0, 0, this.#width, this.#height)
    }
}