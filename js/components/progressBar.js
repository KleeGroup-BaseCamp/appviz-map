class ProgressBar {
    #value
    #maxValue
    #width
    #color

    constructor(value, maxValue, width, color /* p5 Color*/) {
        this.#value = value
        this.#maxValue = maxValue
        this.#width = width
        this.#color = color
    }

    render() {
        strokeJoin(ROUND)
        strokeWeight(8)
        this.#color.setAlpha(100)
        stroke(this.#color)
        line(0, 0, this.#width, 0)
        this.#color.setAlpha(255)
        stroke(this.#color)
        line(0, 0, (this.#value / this.#maxValue) * this.#width, 0)
    }
}