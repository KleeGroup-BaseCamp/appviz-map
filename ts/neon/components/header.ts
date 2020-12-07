import * as p5 from "p5"
import {style} from "../../app"
import {Component}  from "./component"
import {TextUtils} from "../utils"

export class Header implements Component{
    private readonly title: string
    private readonly width: number
    private readonly height: number
    private readonly fontSize: number
    private readonly font: p5.Font

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