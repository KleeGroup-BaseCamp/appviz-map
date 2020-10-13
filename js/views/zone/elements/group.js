class Group extends Element {
    #items
    #maxValue
    #header
    #progressBars
    #color

    constructor(id, width, height, title, items, color, maxValue = 20) {
        super(id, width, height, true)
        this.#color = color
        this.#header = new Header( title, width, 50, style.text.size.m)
        this.#items = items
        this.#maxValue = maxValue

        this.#progressBars = []
        const secondaryStroke = style.text.color.primary
        this.#items.forEach(item => this.#progressBars.push(new ProgressBar(item.frequency, this.#maxValue, this.getWidth() - 90, secondaryStroke)))
    }

    /**
     * @override
     */
    render() {
        //-- background
        this.#renderBackground()
        //-- header
        this.#header.render()
        //-- body
        this.#renderItems()
        noStroke()
        fill(this.#color) 
        rect(0, 0, 4, 50)    
    }

    #renderBackground() {
        const selected = (this === state.selectedElement) 
        fill(selected 
            ? style.color.front
            : style.color.middle)
        noStroke()
        rect(0, 0, this.getWidth(), this.getHeight())
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
            positions.push(top + (this.getHeight() - top) / (this.#items.length + 1) * (i + 1))
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
}