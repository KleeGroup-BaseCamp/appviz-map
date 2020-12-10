import {Component, State, ComponentProps, PxSize, Header} from "../../neon"

export class ItemTypeDetail extends Component {
    private readonly header: Header

    constructor(title: string, props: ComponentProps) {
        super(props, "ItemTypeDetail", false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 60),
                fontSize: this.style.text.size.xl,
                font: this.style.icon.font
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
        fill(this.style.color.middle)
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}