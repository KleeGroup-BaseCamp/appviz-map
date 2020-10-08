class Group extends Element {
    #width
    #height
    #items
    #maxValue // Make static ?
    #header
    title
    zone 

    constructor(width, height, title, zone, items, maxValue = 20) {
        super();
        this.#width = width;
        this.#height = height;

        this.title = title ? Utils.buildDisplayableTitle(title, width, style.getFontSize("xs")) : "No title"
        this.zone = zone
        this.#header = new Header(title, width, /*fontSize*/ "m", style.getPrimaryStroke("group", this.zone))
        this.#items = items
        this.#maxValue = maxValue
    }

    /**
     * @override
     */
    render() {
        this.#renderBackground()
        this.#header.render()
        this.#renderItems()
    }

    #renderBackground() {
        strokeWeight(2)
        fill(style.getShapeFill("group", (state.selectedElement && this.id == state.selectedElement.id) ? "hover" : "default"))
        stroke(style.getPrimaryStroke("group", this.zone))
        rect(0, 0, this.#width, this.#height);
    }

    #renderItems() {
        const top = textAscent() + 35
        let positions = []
        for (let i = 0; i < this.#items.length; i++) {
            positions.push(top + (this.#width - top) / (this.#items.length + 1) * (i + 1))
        }
        const secondaryStroke = style.getSecondaryStroke("group")
        this.#items.forEach((item, index) => {
            push()
            translate(0, positions[index])
            this.#renderItemTypeIcon(item.prefix)
            translate(55, -textAscent() / 2)
            new ProgressBar(item.frequency, this.#maxValue, this.#width - 90, secondaryStroke)
                .render()
            pop()
        })
    }

    #renderItemTypeIcon(itemPrefix) {
        rectMode(CENTER)
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("xs"))
        textFont(style.getFont(true))
        text(style.getIcon(itemPrefix), 20, 0)
        text("0", 40, 0)
        text(this.#maxValue.toString(), this.#width - 15, 0)
    }

    /**
     * @override
     */
    contains(x, y) {
        return x > 0
            && x < this.#width
            && y > 0
            && y < this.#height
    }
}