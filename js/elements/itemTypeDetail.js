class ItemTypeDetail extends Rectangle {
    #items
    constructor(width, height, title, items) {
        super(width, height);
        this.title = title;
        this.#items = items
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
        fill([100, 100, 200])
        rect(0, 0, this._width, this._height);
    }
    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("l"))
        textFont(style.getFont(true))
        textAlign(CENTER);
        text(
            this.title ? this.#getDisplayableText(this.title, this._width) : "No title",
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
        textFont(style.getFont(false))
        const padding = 10 // Use px and py
        const itemsPerRow = 4;
        const itemHeight = 30;
        const itemWidth = (this._width - padding * (itemsPerRow + 1)) / itemsPerRow;
        const height = this.#items ?
            50 + Math.ceil(this.#items.length / itemsPerRow) * (itemHeight + padding) :
            50;



        textSize(16)
        this.#items.forEach((item, index) => {
            const x = (((itemWidth + padding) * index + padding) % (this._width - padding))
            const y = 60 + Math.floor(index / itemsPerRow) * (itemHeight + 2 * padding)
            this.#renderItem(item, x, y, itemWidth, itemHeight)
        })
    }

    #renderItem(itemName, x, y, itemWidth, itemHeight) {
        fill(255)
        rect(x, y, itemWidth, itemHeight)
        fill(0)
        textSize(16)
        textAlign(CENTER, CENTER);

        text(
            itemName ? this.#getDisplayableText(itemName.slice(2), itemWidth) : "No title",
            x,
            y,
            itemWidth,
            itemHeight
        )

    }

    #getMaxCharacters(text, width) {
        let numOfCharacters = 1;
        while (
            numOfCharacters < text.length &&
            textWidth(text.slice(0, numOfCharacters)) <
            width - textWidth("m")
        ) {
            numOfCharacters++;
        }
        return numOfCharacters;
    }

    #getDisplayableText(text, width) {
        const numOfCharacters = this.#getMaxCharacters(text, width);
        return numOfCharacters == text.length ?
            text :
            text.slice(0, numOfCharacters - 3) + "...";
    }
}