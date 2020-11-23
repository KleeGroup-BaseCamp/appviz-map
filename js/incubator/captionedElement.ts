import * as p5 from "p5"
import { style } from "../app"
import { VText } from "../components"
import {VElement, State} from "../core"
import {PxPosition, PxSize} from "../layout"



export class CaptionedElement extends VElement{
    private readonly element: VElement
    private readonly vText : VText

    constructor(id: any, element: VElement, textSize: number = style.text.size.m){
        super(id, CaptionedElement.computePxSize(element, textSize), false)
        this.element = element
        this.vText = new VText(element.constructor.name, style.text.font, textSize)
    }

    public render(state: State) : void {
        this.element.render(state)
        push()
        translate(this.getPxSize().getWidth() / 2, this.getPxSize().getHeight())
        textAlign(CENTER, BOTTOM)
        this.vText.render()
        pop()
    }

    private static computePxSize(element: VElement, size: number): PxSize{
        const padding = 5
        textSize(size)
        textFont(style.text.font)
        return new PxSize(
            max(element.getWidth(), textWidth(element.constructor.name) + 2 * padding), 
            element.getHeight() + textAscent() + textDescent() + padding
        )
    }
    
}