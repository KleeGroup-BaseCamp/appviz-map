import * as p5 from "p5"
import {style} from "../sketch"

export default class VText {
    private text: string
    private font: p5.Font
    private fontSize: number
    private color: p5.Color

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