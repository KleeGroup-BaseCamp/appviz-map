class ZoneView extends Element {
    #width
    #height
    #header
    #corner

    constructor(width, height, title) {
        super()
        this.#width = width
        this.#height = height
        this.#header = new Header(
            title, 
            width, 
            style.text.font, 
            style.text.size.xl, 
            style.text.color, 
            )
        this.#corner = new Corner(30, 30, style.getPrimaryBorderColor("zone", title.toLowerCase()))
    }

    /**g
     * @override
     */
    render() {
        this.#corner.render()
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