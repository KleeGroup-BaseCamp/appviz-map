import {style} from "../../app"
import {VText} from "../components"
import {VElement2, VElementProps} from "../core"

export class Caption extends VElement2{
    private readonly vText : VText

    constructor(text: string, props: VElementProps){
        super(props, false)
        this.vText = new VText(text, style.text.font, style.text.size.m)
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