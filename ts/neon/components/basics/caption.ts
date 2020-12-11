import {VText} from "./vtext"
import {Component, ComponentProps} from "../../core"
import { PushPop } from "../../utils"

export class Caption extends Component{
    private readonly vText : VText

    constructor(text: string, props: ComponentProps){
        super(props, "Caption", false)
        this.vText = new VText(text, {fontSize: this.style.text.size.m})
    }

    @PushPop
    public render() : void {
        const width = this.getPxSize().getWidth()
        const height = this.getPxSize().getHeight()
        fill(this.style.color.front)
        rect(0, 0, width, height)
        translate(this.centerPosition)
        textAlign(CENTER, CENTER)
        this.vText.render()
    }

}