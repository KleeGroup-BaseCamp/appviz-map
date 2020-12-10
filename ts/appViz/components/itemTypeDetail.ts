import {Component, State, ComponentProps, PxSize, Header, n3on} from "../../neon"

export class ItemTypeDetail extends Component {
    private readonly header: Header

    constructor(title: string, props: ComponentProps) {
        super(props, "ItemTypeDetail", false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 60),
                fontSize: n3on.getStyle().text.size.xl,
                font: n3on.getStyle().icon.font
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
        fill(n3on.getStyle().color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}