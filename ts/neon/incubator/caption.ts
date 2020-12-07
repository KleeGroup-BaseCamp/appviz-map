import {style} from "../../app"
import {VText} from "./basics"
import {VElement, VElementProps} from "../core"

export class Caption extends VElement{
    private readonly vText : VText

    constructor(text: string, props: VElementProps){
        super(props, false)
        this.vText = new VText(text, {fontSize: style.text.size.m})
    }

    public render() : void {
        const width = this.getPxSize().getWidth()
        const height = this.getPxSize().getHeight()
        fill(style.color.front)
        rect(0, 0, width, height)
        push()
        translate(width / 2, height / 2)
        textAlign(CENTER, CENTER)
        this.vText.render()
        pop()
    }

}