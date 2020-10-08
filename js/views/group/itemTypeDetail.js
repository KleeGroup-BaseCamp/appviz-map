class ItemTypeDetail extends Element {
    #width
    #height
    #header

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.#header = new Header(title, width, "l"/*fontSize*/, 255)
    }

    render() {
        this.#renderBackground()
        this.#header.render()
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill([100, 100, 200])
        rect(0, 0, this.#width, this.#height)
    }
}