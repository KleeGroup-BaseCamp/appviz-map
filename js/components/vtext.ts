import * as p5 from "p5"
import {style} from "../app"
import {Component}  from "./component"

export class VText implements Component{
    private readonly font: p5.Font
    private readonly fontSize: number
    private readonly color: p5.Color

    private text: string

    constructor(text: string, font: p5.Font, fontSize: number, color: p5.Color = style.text.color.primary) {
        this.text = text
        this.font = font
        this.fontSize = fontSize
        this.color = color
    }

    public render(): void {
        noStroke()
        fill(this.color)
        textSize(this.fontSize)
        textFont(this.font)
        text(this.text, 0, 0)
    }

    public setText(text: string): void{
        this.text = text
    }
}