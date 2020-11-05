/**
 * View of a zone.
 */
import * as p5 from "p5"
import {sketch, style} from "../../sketch"
import {VElement, State, Style} from "../../core"
import {Header, Corner} from "../../components"
import {PxSize} from "../../layout"

export class Zone extends VElement {
    private readonly header: Header
    private readonly corner: Corner

    /**
     * 
     * @param {*} id 
     * @param {Pxsize} pxSize 
     * @param {string} title 
     * @param {Color} color 
     */
    constructor(id: any, pxSize: PxSize, title: string, color: p5.Color) {
        super(id, pxSize, false)
        this.header = new Header(
            title, 
            this.getWidth(), 
            50,
            style.text.size.l 
            )
        this.corner = new Corner(30, 30, color)
    }

    /**
     * @override
     */
    public render(state : State): void {
        // this.renderBackground()
        this.header.render()
        this.corner.render()
   }

/*    renderBackground() {
        noStroke()
        noFill()
        rect(0, 0, this.width, this.height)
    }
*/
 }