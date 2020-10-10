class Group extends Element {
    #width
    #height
    #items
    #color
    #maxValue
    #cornerSize
    #corner
    #header
    #progressBars
    id

    constructor(width, height, title, items, color, maxValue = 20, cornerSize = 30) {
        super()
        this.#width = width
        this.#height = height
        this.id = title
        this.#color = color
        this.#cornerSize = cornerSize
        this.#corner = new Corner(this.#cornerSize - 5, this.#cornerSize - 5, color)
        this.#header = new Header( title, width, style.text.font, style.text.size.m, style.text.color)
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
        this.#renderCroppedRectangle(this.#cornerSize)
        this.#corner.render()
    }

    #renderCroppedRectangle(cornerSize){
        stroke(style.theme.secondary)
        strokeWeight(1)
        fill(style.theme.middle)
        
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
        this.#items.forEach((item, index) => {
            push()
            translate(20, positions[index])
            new VText(style.getIcon(item.prefix), style.icon.font, style.icon.size.s).render()
            translate(40, 0)
            this.#progressBars[index].render()
            pop()
        })
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