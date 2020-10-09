class Group extends Element {
    #width
    #height
    #items
    #color
    #maxValue
    #header
    id

    constructor(width, height, title, items, color, maxValue = 20) {
        super()
        this.#width = width
        this.#height = height
        this.id = title
        this.#color = color
        this.#header = new Header(
            title, 
            width, 
            style.getFont(false), 
            style.getFontSize("m"), 
            style.getTextColor(), 
            )
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
        const cornerSize = 30
        const padding = 5

        this.#renderCroppedRectangle(cornerSize)
        this.#renderTriangle(cornerSize - padding)
    }

    #renderCroppedRectangle(cornerSize){
        stroke(255)
        strokeWeight(1)
        fill(style.getShapeFill("group", (state.selectedElement === this) ? "hover" : "default"))
        
        beginShape();
        vertex(cornerSize, 0);
        vertex(this.#width - cornerSize, 0);
        vertex(this.#width, cornerSize);
        vertex(this.#width, this.#height);
        vertex(0, this.#height);
        vertex(0, cornerSize);
        endShape(CLOSE);
    }

    /*
    * Right isosceles triangle
    */
    #renderTriangle(sideLength){
        
        stroke(this.#color)
        fill(this.#color)

        beginShape();
        vertex(0, 0);
        vertex(sideLength, 0);
        vertex(0, sideLength);
        endShape(CLOSE);
    }
    
    /*
    *   Render item type:
    *       - Icon
    *       - Progress bar with its information
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

        this.#renderText(20, y, style.getIcon(itemPrefix), style.getFont(true), style.getFontSize("xs"))
        this.#renderText(40, y, "0", style.getFont(false), style.getFontSize("xs"))
        this.#renderText(this.#width - 15, y, this.#maxValue.toString(), style.getFont(false), style.getFontSize("xs"))
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