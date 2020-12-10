import {Component, State, ComponentProps, TextUtils, n3on} from "../../neon"

export class Item extends Component {
     private readonly title: string

    constructor(title: string, props: ComponentProps) {
        super(props, "Item", true)
        this.title = title ? TextUtils.buildDisplayableTitle(title, this.getWidth(), n3on.getStyle().text.size.s) : "No title"
    }

    public render(state : State): void {
        fill(state.isHovered(this) 
            ? n3on.getStyle().color.front
            : n3on.getStyle().color.middle)
        stroke(255)
        rect(0, 0, this.getWidth(), this.getHeight())
        noStroke()
        fill(n3on.getStyle().text.color.primary)
        textSize(n3on.getStyle().text.size.s)
        textFont(n3on.getStyle().text.font)
        textAlign(CENTER, CENTER)
        text(this.title, 0, 0, this.getWidth(), this.getHeight())
    }
}