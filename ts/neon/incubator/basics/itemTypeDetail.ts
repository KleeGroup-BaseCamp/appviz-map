import {style} from "../../../app"
import {VElement, State, VElementProps, PxSize} from "../.."
import {Header} from "../.."

export class ItemTypeDetail extends VElement {
    private readonly header: Header

    constructor(title: string, props: VElementProps) {
        super(props, false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 60),
                fontSize: style.text.size.xl,
                font: style.icon.font
            }
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