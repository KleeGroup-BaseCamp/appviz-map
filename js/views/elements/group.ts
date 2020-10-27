import * as p5 from "p5"
import {VElement} from "../../core/index"
import {Header, ProgressBar, VText} from "../../components/index"
import {style, state} from "../../sketch"
import {PxSize} from "../../layout/index"
import {ItemTypeName, ItemTypeFrequencies} from "../../types/index"

export class Group extends VElement {
    private itemTypeFrequencies: ItemTypeFrequencies
    private maxValue: number
    private header: Header
    private progressBars: ProgressBar[]
    private color: p5.Color

    constructor(id: any, pxSize: PxSize, title: string, itemTypeFrequencies: ItemTypeFrequencies, color: p5.Color, maxValue = 20) {
        super(id, pxSize, true)
        this.color = color
        this.header = new Header( title, this.getWidth(), 50, style.text.size.m)
        this.itemTypeFrequencies = itemTypeFrequencies
        this.maxValue = maxValue

        this.progressBars = []
        const secondaryStroke = style.text.color.primary
        Object.keys(this.itemTypeFrequencies).forEach(item => {
            this.progressBars.push(new ProgressBar(this.itemTypeFrequencies[item as ItemTypeName] ?? 0, this.maxValue, this.getWidth() - 90, secondaryStroke))
        })
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
    }

    private renderBackground(): void {
        fill(state.isHovered(this) 
            ? style.color.front
            : style.color.middle)
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
            new VText(style.getIcon(itemPrefix as ItemTypeName), style.icon.font, style.icon.size.xl).render()
            translate(35, -8)
            this.progressBars[index].render()
            pop()
        })
    }
}