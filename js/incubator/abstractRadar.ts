import {VText} from "../components"
import {State, VElement} from "../core"
import {PxPosition, PxSize } from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

export abstract class AbstractRadar extends VElement{
    private readonly centerPosition: PxPosition
    private readonly vtexts: VText[]
    private readonly textSize: number
    private readonly textMargin: number
    private readonly labels: string[]
    
    protected readonly values: number[]
    protected readonly radius: number

    constructor(id: any, pxSize: PxSize, values: number[]){
        super(id, pxSize, true)
        this.values = values

        this.textSize = style.text.size.xxs
        this.labels = ["Weight", "Capacity", "Quality", "Power", "Popularity", "Size", "Density", "Intensity"] 
        this.vtexts = Array.from(
            {length: this.labels.length}, 
            (_, i) => new VText(this.labels[i], style.text.font, this.textSize, style.text.color.secondary)
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

    public render(state: State) : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderRadar()
        this.renderGraph()
        pop()
        if (state.isHovered(this)){
            this.renderPopUp()
        }
    }

    private renderPopUp(){
        // Pop up rectangle
        noStroke()
        const color = style.color.d
        color.setAlpha(200)
        fill(color)
        rect(0,0,200,200)

        // Pop up content
        fill(style.text.color.primary)
        textSize(style.text.size.s)
        textAlign(LEFT, TOP)
        const margin = 10
        for(let i = 0; i < this.values.length; i++){
            text(`${this.labels[i]}: ${this.values[i].toFixed(2)}` , margin, (i + 1) * (textAscent() + textDescent()) + margin)
        }
    }

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