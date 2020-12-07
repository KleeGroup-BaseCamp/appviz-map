import * as p5 from "p5"
import {style} from "../../app"
import {TextUtils} from "../utils"
import {VElement, VElementProps} from "../core"

export interface HeaderProps extends VElementProps{
    fontSize?: number
    font?: p5.Font
}
export class Header extends VElement{
    private readonly title: string
    private readonly fontSize: number
    private readonly font: p5.Font

    constructor(title: string, props: HeaderProps) {
        super(props, false)
        this.fontSize = props.fontSize ?? style.text.size.s
        this.font = props.font ?? style.text.font
        this.title = title ? TextUtils.buildDisplayableTitle(title, width, this.fontSize) : "No title"
    }

    public render(): void {
        this.renderBackground()
        this.renderTitle()
    }

    private renderBackground(): void {
        noStroke()
        fill(style.color.front)
        rect (0, 0, this.getWidth(), this.getHeight())
    }

    private renderTitle(): void {
        noStroke()
        fill(style.text.color.primary)
        textSize(this.fontSize)
        textFont(this.font)
        textAlign(CENTER)
        text(this.title, 0, textAscent() + 15, this.getWidth())
    }
}