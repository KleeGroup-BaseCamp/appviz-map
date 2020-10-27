/**
 * View of a zone.
 */
import * as p5 from "p5"
import {VElement} from "../../core/index"
import {Header, Corner} from "../../components/index"
import {PxSize} from "../../layout/index"
import {style} from "../../sketch"

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
    public render(): void {
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