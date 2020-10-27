import VElement from "../../core/element"
import Header from "../../components/header"
import {style} from "../../sketch"
import PxSize from "../../layout/pxSize"
export default class ItemTypeDetail extends VElement {
    private header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(
            title, 
            this.getWidth(), 
            60, 
            style.text.size.xl, 
            style.icon.font
            )
    }

    render() {
        this.renderBackground()
        this.header.render()
    }

    private renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill(style.color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}