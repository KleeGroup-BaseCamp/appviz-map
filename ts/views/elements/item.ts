import {style} from "../../app"
import {VElement, State, VElementProps} from "../../neon"
import {TextUtils}  from "../../neon"

export class Item extends VElement {
     private readonly title: string

    constructor(title: string, props: VElementProps) {
        super(props, true)
        this.title = title ? TextUtils.buildDisplayableTitle(title, this.getWidth(), style.text.size.s) : "No title"
    }

    public render(state : State): void {
        fill(state.isHovered(this) 
            ? style.color.front
            : style.color.middle)
        stroke(255)
        rect(0, 0, this.getWidth(), this.getHeight())
        noStroke()
        fill(style.text.color.primary)
        textSize(style.text.size.s)
        textFont(style.text.font)
        textAlign(CENTER, CENTER)
        text(this.title, 0, 0, this.getWidth(), this.getHeight())
    }
}