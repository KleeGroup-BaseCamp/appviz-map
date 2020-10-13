class GroupView extends Element {
    #width
    #height
    #header

    constructor(id, width, height, title) {
        super(id)
        this.#width = width
        this.#height = height
        this.#header = new Header(
            title,
            width,
            100,
            style.text.size.xxl, 
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