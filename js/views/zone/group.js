class Group extends Element {
    #width
    #height
    #items
    #color
    #maxValue
    #header
    #progressBars
    id

    constructor(width, height, title, items, color, maxValue = 20) {
        super()
        this.#width = width
        this.#height = height
        this.id = title
        this.#color = color
        this.#header = new Header( title, width, style.getFont(false), style.getFontSize("m"), style.getTextColor())
        this.#items = items
        this.#maxValue = maxValue

        this.#progressBars = []
        const secondaryStroke = style.getSecondaryBorderColor("group")
        this.#items.forEach(item => this.#progressBars.push(new ProgressBar(item.frequency, this.#maxValue, this.#width - 90, secondaryStroke)))
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
        const cornerSize = 30
        const padding = 5

        this.#renderCroppedRectangle(cornerSize)
        new Triangle(cornerSize - padding, this.#color).render()
    }

    #renderCroppedRectangle(cornerSize){
        stroke(255)
        strokeWeight(1)
        fill(style.getShapeFill("group", (state.selectedElement === this) ? "hover" : "default"))
        
        beginShape()
        vertex(cornerSize, 0)
        vertex(this.#width - cornerSize, 0)
        vertex(this.#width, cornerSize)
        vertex(this.#width, this.#height)
        vertex(0, this.#height)
        vertex(0, cornerSize)
        endShape(CLOSE)
    }
    
    /*
    *   Render item type:
    *       - Icon
    *       - Item frequency
    *       - Progress bar
    */

    #renderItems() {
        const top = textAscent() + 35
        let positions = []
        for (let i = 0; i < this.#items.length; i++) {
            positions.push(top + (this.#width - top) / (this.#items.length + 1) * (i + 1))
        }
        const secondaryStroke = style.getSecondaryBorderColor("group")
        this.#items.forEach((item, index) => {
            push()
            translate(0, positions[index])
            this.#renderText(20, 0, style.getIcon(item.prefix), style.getFont(true), style.getFontSize("s"))
            this.#renderText(50, 0, item.frequency, style.getFont(false), style.getFontSize("s"))
            translate(70, -textAscent() / 2 + 4)
            this.#progressBars[index].render()
            pop()
        })
    }

    #renderText(x, y, ...textParams){
        push()
        translate(x, y)
        new VText(...textParams).render()
        pop()
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