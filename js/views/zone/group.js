class Group extends Element {
    #id
    #width
    #height
    #items
    #maxValue
    #cornerSize
    #corner
    #header
    #progressBars
    #color

    constructor(id, width, height, title, items, color, maxValue = 20, cornerSize = 30) {
        super(id)
        this.#width = width
        this.#height = height
        this.#cornerSize = cornerSize
        this.#color = color
        this.#corner = new Corner(this.#cornerSize - 5, this.#cornerSize - 5, color)
        this.#header = new Header( title, width, 50, style.text.size.m)
        this.#items = items
        this.#maxValue = maxValue

        this.#progressBars = []
        const secondaryStroke = style.text.color.primary
        this.#items.forEach(item => this.#progressBars.push(new ProgressBar(item.frequency, this.#maxValue, this.#width - 90, secondaryStroke)))
    }

    /**
     * @override
     */
    render() {
        //-- background
        this.#renderBackground()
        //-- header
        this.#header.render()
       // this.#corner.render()
        //-- body
        this.#renderItems()
        noStroke()
        fill(this.#color) 
        rect(0, 0, 2, 50)    
    }

    #renderBackground() {
        const selected = (this === state.selectedElement) 
        fill(selected 
            ? style.color.front
            : style.color.middle)
        noStroke()
        rect(0, 0, this.#width, this.#height)

/*        beginShape()
        vertex(this.#cornerSize, 0)
        vertex(this.#width - this.#cornerSize, 0)
        vertex(this.#width, this.#cornerSize)
        vertex(this.#width, this.#height)
        vertex(0, this.#height)
        vertex(0, this.#cornerSize)
        endShape(CLOSE)
    */    
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
            positions.push(top + (this.#height - top) / (this.#items.length + 1) * (i + 1))
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