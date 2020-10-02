class GroupView extends Rectangle {
    constructor(width, height, title) {
        super(width, height);
        this.title = title;
    }

    render() {
        this.#renderRectangle()
        this.#renderTitle();
        this.#renderBar()
        this.#renderItems()
    }
    #renderRectangle() {
        strokeWeight(1)
        stroke(255)
        fill(100)
        rect(0, 0, this._width, this._height);
    }
    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("xxl"))
        textFont(style.getFont(false))
        textAlign(CENTER);
        text(
            this.title ? this.#getDisplayableTitle() : "No title",
            0,
            textAscent() + 15,
            this._width
        );
    }

    #renderBar() {
        stroke(255)
        line(this._width / 4, textAscent() + textDescent() + 20, this._width * 3 / 4, textAscent() + textDescent() + 20)
    }

    #renderItems() {
        const padding = 10;
        const x = padding;
        const y = typeIndex * 300 + 100;
        const width = canvasSize - 2 * padding;
        const itemsPerRow = 4;
        const itemHeight = 30;
        const itemWidth = (width - padding * (itemsPerRow + 1)) / itemsPerRow;
        let items = domains[groupName][this.#types[typePrefix]];
        const height = items ?
            50 + Math.ceil(items.length / itemsPerRow) * (itemHeight + padding) :
            50;
    }

    #getMaxCharacters() {
        let numOfCharacters = 1;
        while (
            numOfCharacters < this.title.length &&
            textWidth(this.title.slice(0, numOfCharacters)) <
            this._width - textWidth("m")
        ) {
            numOfCharacters++;
        }
        return numOfCharacters;
    }

    #getDisplayableTitle() {
        const numOfCharacters = this.#getMaxCharacters();
        return numOfCharacters == this.title.length ?
            this.title :
            this.title.slice(0, numOfCharacters - 3) + "...";
    }
}