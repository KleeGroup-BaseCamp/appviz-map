import {VText} from "../components"
import {State, VElement} from "../core"
import {PxPosition, PxSize } from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"
import { AbstractRating } from "./abstractRating"
import { StarRating } from "./starRating"
import {ColorUtils} from "../utils"

type RadarData = {[label: string]: number}

export abstract class AbstractRadar extends VElement{
    private readonly centerPosition: PxPosition
    private readonly popUp: PopUp
    private readonly labels: VText[] = []
    private readonly scales: VText[] = []
    private readonly textSize: number
    private readonly textMargin: number
    
    protected readonly values: number[]
    protected readonly radius: number

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
        // const longestLabel = keys.find(
        //     label => label.length == Math.max(...keys.map(label => label.length))
        // )
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
            this.renderPopUp()
        }
    }

    private renderPopUp(){
        // Pop up rectangle
        // noStroke()
        // const c = color(red(style.color.d), green(style.color.d), blue(style.color.d), 200)
        // fill(c)
        // rect(0,0,200,200)

        // // Pop up content
        // fill(style.text.color.primary)
        // textSize(style.text.size.s)
        // textAlign(LEFT, TOP)
        // const margin = 10
        // for(let i = 0; i < this.values.length; i++){
        //     text(
        //         `${this.labels[i].getText()}: `,
        //         margin, 
        //         i * (textAscent() + textDescent()) + margin
        //     )

        // }
        this.popUp.render()
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

class PopUp extends VElement{
    private readonly ratings: AbstractRating[] = []
    private readonly labels: VText[] = []
    private readonly size: number
    private readonly padding: number

    constructor(id: any, pxSize: PxSize, data: RadarData){
        super(id, pxSize, false)
        this.padding = 10
        this.size = style.text.size.xs
        textSize(this.size)
        for(let label in data){
            const width = textWidth(label)
            this.labels.push(new VText(label, style.text.font, this.size))
            this.ratings.push(
                new StarRating(
                    "-1", 
                    new PxSize(pxSize.getWidth() - 2 * this.padding - width, textAscent() + textDescent()), // TO DO: proper use of padding
                    data[label] / 20 // -> [0, 5]
                )
            )
        }
    }

    render(): void{
        // Pop up rectangle
        noStroke()
        const c = ColorUtils.clone(style.color.a)
        c.setAlpha(150)
        fill(c)
        // const maxLabelwidth = Math.max(...this.labels.map(label => textWidth(label.getText()))) // CC Abstract radar --> Make utils method ?
        rect(0, 0, this.getPxSize().getWidth(), this.getPxSize().getHeight())

        // Pop up content
        fill(style.text.color.primary)
        textSize(this.size)
        textAlign(LEFT, TOP)
        const height = this.ratings[0].getPxSize().getHeight()
        textSize(this.size)
        for(let i = 0; i < this.labels.length; i++){
            push()
            translate(this.padding, this.padding + (height + this.padding) * i, )
            this.labels[i].render()
            translate(textWidth(this.labels[i].getText()) + this.padding, 0)
            this.ratings[i].render()
            pop()
        }
    }
}