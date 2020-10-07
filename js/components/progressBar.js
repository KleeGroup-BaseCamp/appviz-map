class ProgressBar {
    #value
    #maxValue
    #width
    #color

    constructor (value, maxValue, width, color){
        this.#value = value
        this.#maxValue = maxValue
        this.#width = width
        this.#color = color
    }

    render() {
        this.#color.setAlpha(100)
        strokeWeight(4)
        stroke(this.#color)
        line(0, 0, this.#width, 0)
        this.#color.setAlpha(255)
        stroke(this.#color)
        line(0, 0, (this.#value / this.#maxValue) * this.#width, 0)
    }
}