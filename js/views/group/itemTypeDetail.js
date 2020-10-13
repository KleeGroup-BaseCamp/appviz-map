class ItemTypeDetail extends Element {
    #header

    constructor(id, width, height, title) {
        super(id, width, height, false)
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
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}