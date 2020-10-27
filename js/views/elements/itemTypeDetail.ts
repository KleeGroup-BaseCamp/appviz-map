import {VElement} from "../../core/index"
import {Header} from "../../components/index"
import {style} from "../../sketch"
import {PxSize} from "../../layout/index"

export class ItemTypeDetail extends VElement {
    private readonly header: Header

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

    public render(): void {
        this.renderBackground()
        this.header.render()
    }

    private renderBackground(): void {
        strokeWeight(1)
        stroke(255)
        fill(style.color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}