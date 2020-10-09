class ZoneView extends Element {
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
            style.getFontSize("xl"), 
            style.getTextColor(), 
            255)
    }

    /**g
     * @override
     */
    render() {
        this.#renderBackground()
        this.#header.render()
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill([0, 0]) //No fill
        rect(0, 0, this.#width, this.#height)
    }
}