/**
 * View of a zone.
 */
class ZoneView extends Element {
    #header
    #corner

    constructor(id, width, height, title, color) {
        super(id, width, height, false)
        this.#header = new Header(
            title, 
            width, 
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