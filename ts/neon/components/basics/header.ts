import * as p5 from "p5"
import {TextUtils} from "../../utils"
import {Component, ComponentProps} from "../../core"

export interface HeaderProps extends ComponentProps{
    fontSize?: number
    font?: p5.Font
}
export class Header extends Component{
    private readonly title: string
    private readonly fontSize: number
    private readonly font: p5.Font

    constructor(title: string, props: HeaderProps) {
        super(props, "Header", false)
        this.fontSize = props.fontSize ?? this.style.text.size.s
        this.font = props.font ?? this.style.text.font
        this.title = title ? TextUtils.buildDisplayableTitle(title, width, this.fontSize) : "No title"
    }

    public render(): void {
        this.renderBackground()
        this.renderTitle()
    }

    private renderBackground(): void {
        noStroke()
        fill(this.style.color.front)
        rect (0, 0, this.getWidth(), this.getHeight())
    }

    private renderTitle(): void {
        noStroke()
        fill(this.style.text.color.primary)
        textSize(this.fontSize)
        textFont(this.font)
        textAlign(CENTER)
        text(this.title, 0, textAscent() + 15, this.getWidth())
    }
}