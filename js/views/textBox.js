class TextBox extends Element {
    #width
    #height

    constructor(width, height, text) {
        super();
        this.#width = width
        this.#height = height
        textSize(style.getFontSize("s"))
        this.text = text ? Utils.buildDisplayableTitle(text, width) : "No title";
    }

    render() {
        fill(style.getShapeFill("item", this._state))
        rect(0, 0, this.#width, this.#height)
        fill(255)
        textSize(style.getFontSize("s"))
        textAlign(CENTER, CENTER);

        text(this.text, 0, 0, this.#width, this.#height);
    }
    contains(x, y) {
        return x > 0 &&
            x < this.#width &&
            y > 0 &&
            y < this.#height;
    }
}