class Item extends Element {
    #width
    #height

    constructor(width, height, title) {
        super();
        this.#width = width
        this.#height = height
        this.title = title ? Utils.buildDisplayableTitle(title, width, style.getFontSize("s")) : "No title";
    }

    render() {
        fill(style.getShapeFill("item", (state.selectedElement && this.id == state.selectedElement.id) ? "hover" : "default"))
        rect(0, 0, this.#width, this.#height)
        fill(255)
        textSize(style.getFontSize("s"))
        textAlign(CENTER, CENTER);

        text(this.title, 0, 0, this.#width, this.#height);
    }
    contains(x, y) {
        return x > 0
            && x < this.#width
            && y > 0
            && y < this.#height;
    }
}