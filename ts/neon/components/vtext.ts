import * as p5 from "p5"
import {style} from "../../app"
import {VElement, VElementProps} from "../core"
import {ColorUtils} from "../utils"

export interface VTextProps extends VElementProps{
    fontSize?: number
    fontColor?: p5.Color
    font?: p5.Font
}
export class VText extends VElement{
    private readonly font: p5.Font
    private readonly fontSize: number
    private readonly color: p5.Color

    private text: string

    constructor(text: string, props: VTextProps) {
        super(props, false)
        this.text = text
        this.fontSize = props.fontSize ?? style.text.size.s
        this.font = props.font ?? style.text.font
        this.color = ColorUtils.clone(props.fontColor ?? style.text.color.primary)
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

    public getText(): string{
        return this.text
    }
}