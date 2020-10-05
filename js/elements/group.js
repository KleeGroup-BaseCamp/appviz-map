class Group extends Element {
    #width;
    #height;
    #items
    #maxValue // Make static ?
    title    

    constructor(width, height, title, zone, items, maxValue = 20) {
        super();
        this.#width = width;
        this.#height = height;
     
        this.title = title ? Utils.buildDisplayableTitle(title, width) : "No title" 
        
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
        rect(0, 0, this.#width, this.#height);
    }

    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("m"))
        textFont(style.getFont(false))
        textAlign(CENTER);
        text(this.title, 0, textAscent() + 15, this.#width);
    }

    #renderBar() {
        stroke(style.getPrimaryStroke("group", this.zone))
        strokeWeight(2)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }

    #renderItems() {
        const top = textAscent() + 35
        let positions = []
        for (let i = 0; i < this.#items.length; i++) {
            positions.push(top + (this.#width - top) / (this.#items.length + 1) * (i + 1))
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
        text(getIcon(itemPrefix), 10, 0);
        text("0", 40, 0)
        text(this.#maxValue.toString(), this.#width - 25, 0)
    }

    #renderFrequencyBar(itemFrequency) {
        const start = 55;
        const end = 35;
        const length = this.#width - start - end;
        strokeWeight(4);
        stroke(style.getSecondaryStroke("group"), 100);
        line(start, -textAscent() / 2, this.#width - end, -textAscent() / 2);
        stroke(style.getSecondaryStroke("group"));
        line(
            start,
            -textAscent() / 2,
            start + (itemFrequency / this.#maxValue) * length,
            -textAscent() / 2
        );
    }

    contains(x, y) {
        return x > 0 &&
          x < this.#width &&
          y > 0 &&
          y < this.#height;
      }
}