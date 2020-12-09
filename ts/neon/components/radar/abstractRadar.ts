import {VText} from "../basics"
import {State, Component, ComponentProps} from "../../core"
import {PxSize} from "../../layout"
import {AnimationUtils, ColorUtils} from "../../utils"
import {PopUp} from "./popup"

export type RadarData = {[label: string]: number}

export abstract class AbstractRadar extends Component{
    private readonly popUp: PopUp
    private readonly labels: VText[] = []
    private readonly scales: VText[] = []
    private readonly textSize: number
    private readonly textMargin: number

    protected readonly radius: number
    protected readonly values: number[] 

    constructor(data: RadarData, props: ComponentProps){
        super(props, "Radar", false)
        this.values = new Array(Object.keys(data).length)

        this.textSize = this.getTextSize()
        for(let label in data){
            this.labels.push(
                new VText(
                    label, 
                    {
                        fontSize: this.textSize, 
                        fontColor: this.style.text.color.secondary
                    }
                )
            )
        }

        const numOfCircles = 4
        for (let i = 0; i < numOfCircles; i++){
            this.scales.push(
                new VText(
                    (100 * (i + 1) / numOfCircles).toString(), 
                    {
                        fontSize: this.textSize, 
                        fontColor: this.style.text.color.secondary
                    }
                )
            )
        }

        this.popUp = new PopUp(data, {size: new PxSize(250, 250)}) // TO DO: change harcoded value
        textSize(this.textSize)
        textFont(this.style.text.font)
        const keys = Object.keys(data)
        const longestLabelWidth = Math.max(...keys.map(label => textWidth(label)))
        this.textMargin = (textAscent() + textDescent()) / 2
        this.radius = min(this.getHeight(), this.getWidth()) / 2 - longestLabelWidth - this.textMargin
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
        this.doRenderGraph(state)
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
        stroke(this.style.color.front)
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

    doRenderGraph(state: State): void {
        strokeWeight(2)
        const c = ColorUtils.clone(this.style.color.a)
        stroke(c)
        c.setAlpha(50)
        fill(c) 
        this.renderGraph(state)
    }

    abstract renderGraph(state: State): void

    private getTextSize(): number{ // Make into util function
        // Improvement: make text size depend on longuest label
        const width = this.getWidth()
        if (width <= 250) return this.style.text.size.xxs
        if (width <= 350) return this.style.text.size.xs
        return this.style.text.size.s
    }
}