class Item extends Element {
    #id
    #width
    #height
    #title

    constructor(width, height, title) {
        super()
        this.#id = title // Temp
        this.#width = width
        this.#height = height
        this.#title = title ? TextUtils.buildDisplayableTitle(title, width, style.text.size.s) : "No title"
    }

    getId(){
        return this.#id
    }

    render() {
        fill((this === state.selectedElement) 
            ? style.color.front
            : style.color.middle)
        stroke(255)
        rect(0, 0, this.#width, this.#height)
        noStroke()
        fill(style.text.color.primary)
        textSize(style.text.size.s)
        textFont(style.text.font)
        textAlign(CENTER, CENTER)
        text(this.#title, 0, 0, this.#width, this.#height)
    }
    contains(x, y) {
        return x > 0
            && x < this.#width
            && y > 0
            && y < this.#height
    }
}