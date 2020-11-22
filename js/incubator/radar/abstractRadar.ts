import {VText} from "../../components"
import {State, VElement} from "../../core"
import {PxPosition, PxSize } from "../../layout"
import {AnimationUtils} from "../../utils"
import {style} from "../../app"
import {PopUp} from "./popup"

export type RadarData = {[label: string]: number}

export abstract class AbstractRadar extends VElement{
    private readonly centerPosition: PxPosition
    private readonly popUp: PopUp
    private readonly labels: VText[] = []
    private readonly scales: VText[] = []
    private readonly textSize: number
    private readonly textMargin: number
    protected readonly radius: number
    
    protected readonly values: number[]

    constructor(id: any, pxSize: PxSize, data: RadarData){
        super(id, pxSize, true)
        this.values = new Array(Object.keys(data).length)

        this.textSize = style.text.size.xxs
        for(let label in data){
            this.labels.push(new VText(label, style.text.font, this.textSize, style.text.color.secondary))
        }

        const numOfCircles = 4
        for (let i = 0; i < numOfCircles; i++){
            this.scales.push(
                new VText(
                    (100 * (i + 1) / numOfCircles).toString(), 
                    style.text.font, 
                    this.textSize, 
                    style.text.color.secondary
                )
            )
        }

        this.popUp = new PopUp("-1", new PxSize(250, 250), data) // TO DO: change harcoded value
        textSize(this.textSize)
        textAlign(LEFT, CENTER)
        textFont(style.text.font)
        const keys = Object.keys(data)
        const longestLabelWidth = Math.max(...keys.map(label => textWidth(label)))
        this.textMargin = (textAscent() + textDescent()) / 2
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2 - longestLabelWidth - this.textMargin
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
                const keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++){
                    this.values[i] = data[keys[i]] * s
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
            this.popUp.render()
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
            const alpha = - HALF_PI + angleStep * i
            const x = this.radius * cos(alpha)
            const y = this.radius * sin(alpha)
            line(0, 0, x, y)
            push()
            translate(x + this.textMargin * cos(alpha), y + this.textMargin * sin(alpha))
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