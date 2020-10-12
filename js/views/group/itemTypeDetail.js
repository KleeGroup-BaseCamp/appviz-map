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
            60, 
            style.text.size.xl, 
            style.icon.font
            )
    }

    render() {
        this.#renderBackground()
        this.#header.render()
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill(style.color.middle)
        rect(0, 0, this.#width, this.#height)
    }
}