class ItemTypeDetail extends Rectangle {
    #itemsNames
    items

    constructor(width, height, title, itemsNames) {
        super(width, height);
        this.title = title;
        this.#itemsNames = itemsNames
        this.items = []
        this.#initItems()
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
            this.title ? Utils.buildDisplayableTitle(this.title, this._width) : "No title",
            0,
            textAscent() + 15,
            this._width
        );
    }

    #renderBar() {
        stroke(255)
        line(this._width / 4, textAscent() + textDescent() + 20, this._width * 3 / 4, textAscent() + textDescent() + 20)
    }

    #initItems() {
        const padding = 10 // Use px and py
        const itemsPerRow = 4;
        const itemHeight = 30;
        const itemWidth = (this._width - padding * (itemsPerRow + 1)) / itemsPerRow;
        textFont(style.getFont(false))
        textSize(style.getFontSize("s"))
        this.#itemsNames.forEach((item, index) => {
            const x = (((itemWidth + padding) * index + padding) % (this._width - padding))
            const y = 60 + Math.floor(index / itemsPerRow) * (itemHeight + 2 * padding)
            const textBox = new TextBox(itemWidth, itemHeight, Utils.buildDisplayableTitle(item.slice(2), itemWidth))
            this.items.push({ element: textBox, x, y })

        })
    }

    #renderItems() {
        textFont(style.getFont(false))
        textSize(style.getFontSize("s"))

        this.items.forEach((item) => {
            push()
            translate(item.x, item.y)
            fill(style.getShapeFill("itemTypeDetail", item.element._state))
            item.element.render()
            pop()
        })
    }

    contains(x, y) {
        for (const item of this.items) {
            if (item.element.contains(x - item.x, y - item.y)) {
                item.element._state = "hover"
                return true
            }
        }
        return false
    }
}