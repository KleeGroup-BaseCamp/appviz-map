class GroupView extends Element {
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
            style.getFont(false),
            style.getFontSize("xxl"), 
            style.getTextColor(), 
            255
            )
    }

    /**
     * @override
     */
    render() {
        this.#renderBackground()
        this.#header.render()
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill([0, 0])
        rect(0, 0, this.#width, this.#height)
    }
}