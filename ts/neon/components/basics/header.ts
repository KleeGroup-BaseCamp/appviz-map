import * as p5 from "p5"
import {neon} from "../../../appViz/app"
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
        super(props, "", false)
        this.fontSize = props.fontSize ?? neon.getStyle().text.size.s
        this.font = props.font ?? neon.getStyle().text.font
        this.title = title ? TextUtils.buildDisplayableTitle(title, width, this.fontSize) : "No title"
    }

    public render(): void {
        this.renderBackground()
        this.renderTitle()
    }

    private renderBackground(): void {
        noStroke()
        fill(neon.getStyle().color.front)
        rect (0, 0, this.getWidth(), this.getHeight())
    }

    private renderTitle(): void {
        noStroke()
        fill(neon.getStyle().text.color.primary)
        textSize(this.fontSize)
        textFont(this.font)
        textAlign(CENTER)
        text(this.title, 0, textAscent() + 15, this.getWidth())
    }
}