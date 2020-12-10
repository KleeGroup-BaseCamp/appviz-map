import {Component, State, ComponentProps, TextUtils} from "../../neon"

export class Item extends Component {
     private readonly title: string

    constructor(title: string, props: ComponentProps) {
        super(props, "Item", true)
        this.title = title ? TextUtils.buildDisplayableTitle(title, this.getWidth(), this.style.text.size.s) : "No title"
    }

    public render(state : State): void {
        fill(state.isHovered(this) 
            ? this.style.color.front
            : this.style.color.middle)
        stroke(255)
        rect(0, 0, this.getWidth(), this.getHeight())
        noStroke()
        fill(this.style.text.color.primary)
        textSize(this.style.text.size.s)
        textFont(this.style.text.font)
        textAlign(CENTER, CENTER)
        text(this.title, 0, 0, this.getWidth(), this.getHeight())
    }
}