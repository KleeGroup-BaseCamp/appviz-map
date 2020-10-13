/**
 * View of a zone.
 *   
 */
class ZoneView extends Element {
    #id
    #width
    #height
    #header
    #corner

    constructor(id, width, height, title, color) {
        super(id)
        this.#width = width
        this.#height = height
        this.#header = new Header(
            title, 
            width, 
            50,
            style.text.size.l 
            )
        this.#corner = new Corner(30, 30, color)
    }

    /**g
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