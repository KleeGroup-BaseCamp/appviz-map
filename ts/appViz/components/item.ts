import {neon} from "../app"
import {Component, State, ComponentProps, TextUtils} from "../../neon"

export class Item extends Component {
     private readonly title: string

    constructor(title: string, props: ComponentProps) {
        super(props, "Item", true)
        this.title = title ? TextUtils.buildDisplayableTitle(title, this.getWidth(), neon.getStyle().text.size.s) : "No title"
    }

    public render(state : State): void {
        fill(state.isHovered(this) 
            ? neon.getStyle().color.front
            : neon.getStyle().color.middle)
        stroke(255)
        rect(0, 0, this.getWidth(), this.getHeight())
        noStroke()
        fill(neon.getStyle().text.color.primary)
        textSize(neon.getStyle().text.size.s)
        textFont(neon.getStyle().text.font)
        textAlign(CENTER, CENTER)
        text(this.title, 0, 0, this.getWidth(), this.getHeight())
    }
}