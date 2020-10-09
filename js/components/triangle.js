class Triangle {
    #sideLength
    #color

    constructor(sideLength, color) {
        this.#sideLength = sideLength
        this.#color = color
    }

    render() {
        stroke(this.#color)
        fill(this.#color)

        beginShape();
        vertex(0, 0);
        vertex(this.#sideLength, 0);
        vertex(0, this.#sideLength);
        endShape(CLOSE);
    }
}