import {VText} from "../components"
import {State, VElement} from "../core"
import {PxPosition, PxSize } from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

export abstract class AbstractRadar extends VElement{
    private readonly centerPosition: PxPosition
    private readonly labels: VText[]
    private readonly scales: VText[]
    private readonly textSize: number
    private readonly textMargin: number
    
    protected readonly values: number[]
    protected readonly radius: number

    constructor(id: any, pxSize: PxSize, values: number[]){
        super(id, pxSize, true)
        this.values = [...values]

        this.textSize = style.text.size.xxs
        const labelsText = ["Weight", "Capacity", "Quality", "Power", "Popularity", "Size", "Density", "Intensity"] 
        this.labels = Array.from(
            {length: labelsText.length}, 
            (_, i) => new VText(labelsText[i], style.text.font, this.textSize, style.text.color.secondary)
        )
        const numOfCircles = 4
        this.scales = Array.from(
            {length: numOfCircles}, 
            (_, i) => new VText((100 * (i + 1) / numOfCircles).toString() , style.text.font, this.textSize, style.text.color.secondary)
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
        AnimationUtils.animate(
            0, 
            1, 
            duration, 
            (s:number) => {
                for (let i = 0; i < this.values.length; i++){
                    this.values[i] = values[i] * s
                }
            }
        )  
    }

    public render(state: State) : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderRadar()

        strokeWeight(2)
        const c = color(red(style.color.a), green(style.color.a), blue(style.color.a)) // Deep copy
        stroke(c)
        c.setAlpha(50)
        fill(c) 
        this.renderGraph(state)
        pop()
        if (state.isHovered(this)){
            if (mouseX)
            this.renderPopUp()
        }
    }

    private renderPopUp(){
        // Pop up rectangle
        noStroke()
        const c = color(red(style.color.d), green(style.color.d), blue(style.color.d), 200)
        fill(c)
        rect(0,0,200,200)

        // Pop up content
        fill(style.text.color.primary)
        textSize(style.text.size.s)
        textAlign(LEFT, TOP)
        const margin = 10
        for(let i = 0; i < this.values.length; i++){
            text(
                `${this.labels[i].getText()}: ${this.values[i].toFixed(2)}`,
                margin, 
                i * (textAscent() + textDescent()) + margin
            )
        }
    }

    private renderCircle(index: number): void{
        const innerRadius = this.radius * (index + 1) / this.scales.length
        circle(0,0, innerRadius * 2)
        push()
        translate(0, - innerRadius)
        this.scales[index].render()
        pop()
    }

    private renderRadar(): void{
        const numOfCircles = this.scales.length
        noFill()
        stroke(style.color.front)
        textAlign(CENTER, TOP)

        // Outer circle
        strokeWeight(2)
        this.renderCircle(this.scales.length - 1)

        // Inner circles
        strokeWeight(1)
        for(let i = 0; i < numOfCircles - 1; i++){
            this.renderCircle(i)
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
            } else if (angleStep * i < PI){
                textAlign(LEFT, CENTER)
            } else {
                textAlign(RIGHT, CENTER)
            }
            this.labels[i].render()
            pop()
        }
    }

    abstract renderGraph(state: State): void
}