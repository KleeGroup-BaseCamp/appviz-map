/**
 * View of a zone.
 */
import * as p5 from "p5"
import VElement from "../../core/element"
import Header from "../../components/header"
import Corner from "../../components/corner"
import PxSize from "../../layout/pxSize"
import {style} from "../../sketch"
export default class Zone extends VElement {
    private header: Header
    private corner: Corner

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