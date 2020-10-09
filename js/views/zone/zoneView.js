class ZoneView extends Element {
    #width
    #height
    #header
    #color

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
            )
        this.#color = style.getPrimaryBorderColor("zone", title.toLowerCase())
    }

    /**g
     * @override
     */
    render() {
        new Corner(30, 30, this.#color).render()
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