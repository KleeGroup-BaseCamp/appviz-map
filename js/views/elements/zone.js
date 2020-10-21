/**
 * View of a zone.
 */
export default class Zone extends VElement {
    #header
    #corner

    /**
     * 
     * @param {*} id 
     * @param {Pxsize} pxSize 
     * @param {string} title 
     * @param {Color} color 
     */
    constructor(id, pxSize, title, color) {
        super(id, pxSize, false)
        this.#header = new Header(
            title, 
            this.getWidth(), 
            50,
            style.text.size.l 
            )
        this.#corner = new Corner(30, 30, color)
    }

    /**
     * @override
     */
    render() {
//        this.#renderBackground()
        this.#header.render()
        this.#corner.render()
   }

/*    #renderBackground() {
        noStroke()
        noFill()
        rect(0, 0, this.#width, this.#height)
    }
*/
 }