import {style} from "../../app"
import {VElement, State, VElementProps} from "../../neon"
import {Header} from "../../neon"

export class ItemTypeDetail extends VElement {
    private readonly header: Header

    constructor(title: string, props: VElementProps) {
        super(props, false)
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