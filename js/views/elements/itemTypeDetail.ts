import {style} from "../../app"
import {VElement, State} from "../../neon/core"
import {Header} from "../../neon/components"
import {PxSize} from "../../neon/layout"

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

    public render(state : State): void {
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