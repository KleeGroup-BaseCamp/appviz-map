import {VText} from "../components"
import {VElement} from "../core"
import {PxPosition, PxSize } from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

export abstract class AbstractRadar extends VElement{
    private readonly centerPosition: PxPosition
    private readonly vtexts: VText[]
    private readonly textSize: number
    private readonly textMargin: number
    
    protected readonly values: number[]
    protected readonly radius: number

    constructor(id: any, pxSize: PxSize, values: number[]){
        super(id, pxSize, false)
        this.values = values

        this.textSize = style.text.size.xxs
        const texts = ["Weight", "Capacity", "Quality", "Power", "Popularity", "Size", "Density", "Intensity"] 
        this.vtexts = Array.from(
            {length: texts.length}, 
            (_, i) => new VText(texts[i], style.text.font, this.textSize, style.text.color.secondary)
        )
        textSize(this.textSize)
        textAlign(LEFT, CENTER)
        textFont(style.text.font)
        this.textMargin = (textAscent() + textDescent()) / 2
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2 - textWidth('Popularity') - this.textMargin
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        for (let i = 0; i < this.values.length; i++){
            AnimationUtils.animate(0, this.values[i], duration, (s:number) => this.values[i] = s)
        }
    }

    public render() : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderRadar()
        this.renderGraph()
        pop()
    }

    /**
     * 
     * @param start Arc starting angle (from - HALF_PI & anti-clockwise) 
     * @param angleDiff = Arc angle = end angle - start angle
     */

    private renderRadar(): void{
        const numOfCircles = 4
        noFill()
        stroke(style.color.front)

        // Outer circle
        strokeWeight(2)
        circle(0,0, this.radius * 2)

        // Inner circles
        strokeWeight(1)
        for(let i = 0; i < numOfCircles - 1; i++){
            circle(0,0, this.radius * 2 * (i + 1) / numOfCircles)
        }

        // Lines & labels
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        for(let i = 0; i  < dimension; i++){
            const x = this.radius * cos(- HALF_PI + angleStep * i)
            const y = this.radius * sin(- HALF_PI + angleStep * i)
            line(0, 0, x, y)
            push()
            translate(x + this.textMargin * cos(- HALF_PI + angleStep * i), y + this.textMargin * sin(- HALF_PI + angleStep * i))
            if(angleStep * i % PI === 0){
                textAlign(CENTER, CENTER)
                this.vtexts[i].render()
            } else if (angleStep * i < PI){
                textAlign(LEFT, CENTER)
                this.vtexts[i].render()
            } else {
                textAlign(RIGHT, CENTER)
                this.vtexts[i].render()
            }
            pop()
        }
    }

    abstract renderGraph(): void
}