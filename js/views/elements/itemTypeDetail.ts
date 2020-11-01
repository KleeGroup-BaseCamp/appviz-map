import {sketch} from "../../sketch"
import {VElement} from "../../core"
import {Header} from "../../components"
import {PxSize} from "../../layout"

export class ItemTypeDetail extends VElement {
    private readonly header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(
            title, 
            this.getWidth(), 
            60, 
            sketch.style.text.size.xl, 
            sketch.style.icon.font
            )
    }

    public render(): void {
        this.renderBackground()
        this.header.render()
    }

    private renderBackground(): void {
        strokeWeight(1)
        stroke(255)
        fill(sketch.style.color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}