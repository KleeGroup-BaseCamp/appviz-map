import * as p5 from "p5"
import {Component, ComponentProps} from "../../core"
import {ColorUtils} from "../../utils"

export interface VTextProps extends ComponentProps{
    fontSize?: number
    fontColor?: p5.Color
    font?: p5.Font
}
export class VText extends Component{
    private readonly font: p5.Font
    private readonly fontSize: number
    private readonly color: p5.Color

    private text: string

    constructor(text: string, props: VTextProps) {
        super(props, "VText", false)
        this.text = text
        this.fontSize = props.fontSize ?? this.style.text.size.s
        this.font = props.font ?? this.style.text.font
        this.color = ColorUtils.clone(props.fontColor ?? this.style.text.color.primary)
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