class Group extends Rectangle {
    #items
    #maxValue // Make static ?
    constructor(width, height, title, zone, items, maxValue = 20) {
        super(width, height);
        this.title = title;
        this.zone = zone
        this.#items = items
        this.#maxValue = maxValue
    }

    render() {
        this.#renderRectangle()
        this.#renderBar()
        this.#renderItems()
        this.#renderTitle();
    }

    #renderRectangle() {
        strokeWeight(2)
        fill(style.getShapeFill("group", this._state))
        stroke(style.getPrimaryStroke("group", this.zone))
        rect(0, 0, this._width, this._height);
    }

    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("m"))
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
        stroke(style.getPrimaryStroke("group", this.zone))
        strokeWeight(2)
        line(this._width / 4, textAscent() + textDescent() + 20, this._width * 3 / 4, textAscent() + textDescent() + 20)
    }

    #renderItems() {
        const top = textAscent() + 35
        let positions = []
        for (let i = 0; i < this.#items.length; i++) {
            positions.push(top + (this._width - top) / (this.#items.length + 1) * (i + 1))
        }
        this.#items.forEach((item, index) => {
            push()
            translate(0, positions[index])
            this.#renderItemTypeName(item.prefix)
            this.#renderFrequencyBar(item.frequency)
            pop()
        })
    }

    #renderItemTypeName(itemPrefix) {
        rectMode(CENTER);
        noStroke();
        fill(style.getTextFill());
        textSize(style.getFontSize("xs"))
        textFont(style.getFont(true))
        if (itemPrefix == "dt") text(icons.dt, 10, 0);
        else text(icons.tk, 10, 0);
        text("0", 40, 0)
        text(this.#maxValue.toString(), this._width - 25, 0)
    }

    #renderFrequencyBar(itemFrequency) {
        const start = 55;
        const end = 35;
        const length = this._width - start - end;
        strokeWeight(4);
        stroke(style.getSecondaryStroke("group"), 100);
        line(start, -textAscent() / 2, this._width - end, -textAscent() / 2);
        stroke(style.getSecondaryStroke("group"));
        line(
            start,
            -textAscent() / 2,
            start + (itemFrequency / this.#maxValue) * length,
            -textAscent() / 2
        );
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