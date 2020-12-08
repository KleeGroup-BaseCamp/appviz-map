import {neon} from "../../../app"
import {Component, State, ComponentProps, PxSize} from "../.."
import {Header} from "../.."

export class ItemTypeDetail extends Component {
    private readonly header: Header

    constructor(title: string, props: ComponentProps) {
        super(props, false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 60),
                fontSize: neon.getStyle().text.size.xl,
                font: neon.getStyle().icon.font
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
        fill(neon.getStyle().color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}