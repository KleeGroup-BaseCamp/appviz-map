class GroupView extends Rectangle {
    #header
    constructor(width, height, title) {
        super(width, height)
        this.#header  = new Header (title, width,"xxl", 255)
    }

    /**
     * @override
     */
    render() {
        this.#renderRectangle()
        this.#header.render()
    }
    
    #renderRectangle() {
        strokeWeight(1)
        stroke(255)
        fill([0, 0])
        rect(0, 0, this._width, this._height);
    }
}