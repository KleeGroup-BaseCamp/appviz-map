import * as p5 from "p5"
import {sketch} from "../../sketch"
import {VElement} from "../../core"
import {Button, Header, ProgressBar, VText} from "../../components"
import {PxSize} from "../../layout"
import {ItemTypeName, ItemTypeFrequencies} from "../../types"
import {Icons} from "./icons"

export class Group extends VElement {
    private readonly itemTypeFrequencies: ItemTypeFrequencies
    private readonly maxValue: number
    private readonly header: Header
    private readonly progressBars: ProgressBar[]
    private readonly color: p5.Color
    private readonly button : Button

    constructor(id: any, pxSize: PxSize, title: string, itemTypeFrequencies: ItemTypeFrequencies, color: p5.Color, maxValue = 20) {
        super(id, pxSize, true)
        this.color = color
        this.header = new Header( title, this.getWidth(), 50, sketch.style.text.size.m)
        this.itemTypeFrequencies = itemTypeFrequencies
        this.maxValue = maxValue

        this.progressBars = []
        const secondaryStroke = sketch.style.text.color.primary
        Object.keys(this.itemTypeFrequencies).forEach(item => {
            this.progressBars.push(new ProgressBar(this.itemTypeFrequencies[item as ItemTypeName] ?? 0, this.maxValue, this.getWidth() - 90, secondaryStroke))
        })
        this.button = new Button(this.getWidth()/2, this.getHeight()/2, sketch.style.color.undefined, 50)
    }

    /**
     * @override
     */
    public render(): void {
        //-- background
        this.renderBackground()

        //-- header
        this.header.render()
        noStroke()
        fill(this.color) 
        rect(0, 0, 4, 50)   

        //-- body
        this.renderItems()
        //--button
        if (sketch.state.isHovered(this)){
            this.button.render()
        }
    }

    private renderBackground(): void {
        fill(sketch.state.isHovered(this) 
            ? sketch.style.color.front
            : sketch.style.color.middle)
        noStroke()
        rect(0, 0, this.getWidth(), this.getHeight())
    }
    
    /*
    *   Render item type:
    *       - Icon
    *       - Item frequency
    *       - Progress bar
    */
    private renderItems(): void {
        const top = textAscent() + 35
        let positions: number[] = []
        for (let i = 0; i < Object.keys(this.itemTypeFrequencies).length; i++) {
            positions.push(top + (this.getHeight() - top) / (Object.keys(this.itemTypeFrequencies).length + 1) * (i + 1))
        }
        Object.keys(this.itemTypeFrequencies).forEach((itemPrefix, index) => {
            push()
            translate(25, positions[index] + 8)
            new VText(Icons.getIcon(itemPrefix as ItemTypeName), sketch.style.icon.font, sketch.style.icon.size.xl).render()
            translate(35, -8)
            this.progressBars[index].render()
            pop()
        })
    }
}