import {sketch} from "../../sketch"
import {VElement} from "../../core"
import {TextUtils}  from "../../utils"
import {PxSize} from "../../layout"

export class Item extends VElement {
     private readonly title: string

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, true)
        this.title = title ? TextUtils.buildDisplayableTitle(title, this.getWidth(), sketch.style.text.size.s) : "No title"
    }

    public render(): void {
        fill(sketch.state.isHovered(this) 
            ? sketch.style.color.front
            : sketch.style.color.middle)
        stroke(255)
        rect(0, 0, this.getWidth(), this.getHeight())
        noStroke()
        fill(sketch.style.text.color.primary)
        textSize(sketch.style.text.size.s)
        textFont(sketch.style.text.font)
        textAlign(CENTER, CENTER)
        text(this.title, 0, 0, this.getWidth(), this.getHeight())
    }
}