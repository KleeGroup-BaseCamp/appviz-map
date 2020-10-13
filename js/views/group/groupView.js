class GroupView extends Element {
    #header

    constructor(id, width, height, title) {
        super(id, width, height, false)
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
        noStroke()
        noFill()
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}