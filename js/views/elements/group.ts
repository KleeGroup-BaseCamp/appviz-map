import VElement from "../../core/element"
import Header from "../../components/header"
import ProgressBar  from "../../components/progressBar"
import VText  from "../../components/vtext"
import {style, state} from "../../sketch"
import PxSize from "../../layout/pxSize"
import * as p5 from "p5"
import { ItemTypeName, ItemTypeFrequencies } from "../../types/types"



export default class Group extends VElement {
    #itemTypeFrequencies: ItemTypeFrequencies
    #maxValue: number
    #header: Header
    #progressBars: ProgressBar[]
    #color: p5.Color

    constructor(id: any, pxSize: PxSize, title: string, itemTypeFrequencies: ItemTypeFrequencies, color: p5.Color, maxValue = 20) {
        super(id, pxSize, true)
        this.#color = color
        this.#header = new Header( title, this.getWidth(), 50, style.text.size.m)
        this.#itemTypeFrequencies = itemTypeFrequencies
        this.#maxValue = maxValue

        this.#progressBars = []
        const secondaryStroke = style.text.color.primary
        Object.keys(this.#itemTypeFrequencies).forEach(item => {
            this.#progressBars.push(new ProgressBar(this.#itemTypeFrequencies[item as ItemTypeName] ?? 0, this.#maxValue, this.getWidth() - 90, secondaryStroke))
        })
    }

    /**
     * @override
     */
    render() {
        //-- background
        this.renderBackground()

        //-- header
        this.#header.render()
        noStroke()
        fill(this.#color) 
        rect(0, 0, 4, 50)   

        //-- body
        this.renderItems()
    }

    private renderBackground() {
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

    private renderItems() {
        const top = textAscent() + 35
        let positions: number[] = []
        for (let i = 0; i < Object.keys(this.#itemTypeFrequencies).length; i++) {
            positions.push(top + (this.getHeight() - top) / (Object.keys(this.#itemTypeFrequencies).length + 1) * (i + 1))
        }
        Object.keys(this.#itemTypeFrequencies).forEach((itemPrefix, index) => {
            push()
            translate(25, positions[index] + 8)
            new VText(style.getIcon(itemPrefix as ItemTypeName), style.icon.font, style.icon.size.xl).render()
            translate(35, -8)
            this.#progressBars[index].render()
            pop()
        })
    }
}