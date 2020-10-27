import * as p5 from "p5"
import {style} from "../sketch"
import TextUtils from "../utils/textutils"

export default class Header {
    private title: string
    private width: number
    private height: number
    private fontSize: number
    private font: p5.Font

    constructor(title: string, width: number, height: number, fontSize: number, font: p5.Font = style.text.font) {
        this.title = title ? TextUtils.buildDisplayableTitle(title, width, fontSize) : "No title"
        this.width = width
        this.height = height
        this.fontSize = fontSize
        this.font = font
    }

    public render(): void {
        this.renderBackground()
        this.renderTitle()
    }

    private renderBackground(): void {
        noStroke()
        fill(style.color.front)
        rect (0, 0, this.width, this.height)
    }

    private renderTitle(): void {
        noStroke()
        fill(style.text.color.primary)
        textSize(this.fontSize)
        textFont(this.font)
        textAlign(CENTER)
        text(this.title, 0, textAscent() + 15, this.width)
    }
}