import * as p5 from "p5"
import { style } from "../app"
import { VText } from "../components"
import {VElement, State} from "../core"
import {PxSize} from "../layout"

export class Caption extends VElement{
    private readonly vText : VText

    constructor(id: any, pxSize: PxSize, text: string){
        super(id, pxSize, false)
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