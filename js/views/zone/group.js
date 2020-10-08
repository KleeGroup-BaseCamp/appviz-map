class Group extends Element {
    #width
    #height
    #items
    #maxValue // Make static ?
    #header
    title
    zone

    constructor(width, height, title, zone, items, maxValue = 20) {
        super()
        this.#width = width
        this.#height = height
        this.title = title ? Utils.buildDisplayableTitle(title, width, style.getFontSize("xs")) : "No title"
        this.zone = zone
        this.#header = new Header(title, width, style.getFont(false), style.getFontSize("m"), 255, style.getPrimaryStroke("group", this.zone))
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
        fill(style.getShapeFill("group", (state.selectedElement === this) ? "hover" : "default"))
        stroke(style.getPrimaryStroke("group", this.zone))
        rect(0, 0, this.#width, this.#height)
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
        const y = -2
        new VText(style.getIcon(itemPrefix), 20, y, style.getFont(true), style.getFontSize("xs")).render()
        // Progress bar information
        new VText("0", 40, y, style.getFont(false), style.getFontSize("xs")).render()
        new VText(this.#maxValue.toString(), this.#width - 15, y, style.getFont(false), style.getFontSize("xs")).render()
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