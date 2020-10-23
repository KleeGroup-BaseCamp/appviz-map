export default class Corner {
    #width
    #height
    #color

    /**
     * @constructor
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {Color} color 
     */
    constructor(width, height, color) {
        this.#width = width,
        this.#height = height
        this.#color = color
    }

    render() {
        stroke(this.#color)
        fill(this.#color)

        beginShape();
        vertex(0, 0);
        vertex(this.#width, 0);
        vertex(0, this.#height);
        endShape(CLOSE);
    }
}