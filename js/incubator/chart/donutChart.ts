import * as p5 from "p5"
import {style} from "../../app"
import {VText} from "../../neon/components"
import {VElement} from "../../neon/core"
import {PxPosition, PxSize} from "../../neon/layout"

type DonutData = {label: string, value: number}[]

export class DonutChart extends VElement{
    private readonly colors: p5.Color[] = [style.color.a, style.color.b, style.color.c, style.color.d]
    private readonly data: DonutData
    private readonly labels: VText[] = []
    private readonly topPadding: number = 20

    constructor(id: any, pxSize: PxSize, data: DonutData){
        super(id, pxSize, false)
        this.data = data
        this.data.map(
            entry => this.labels.push(
                new VText(entry.label, style.text.font, style.text.size.xs)
            )
        )
    }

    public render(): void{
        push()
        translate(this.getWidth() / 2, (this.getHeight() + this.topPadding) / 2)
        this.renderDonut()
        pop()
        this.renderLegend() 
    }

    private renderDonut(): void{
        noStroke()
        const values = this.data.map(entry => entry.value)
        const sumValues = values.reduce((a, b) => a + b)
        const radius = min(this.getHeight() - this.topPadding, this.getWidth()) / 2
        let currAngle = 0
        values.forEach((value, index) => {
            const angle = TWO_PI * value / sumValues
            fill(this.colors[index])
            arc(0, 0, radius * 2, radius * 2, currAngle, currAngle + angle)
            currAngle += angle
        })
        fill(style.color.back)
        const cutOutPercentage = 0.5
        circle(0, 0, radius * 2 * cutOutPercentage) 
    }

    private renderLegend(): void{
        push()
        textAlign(LEFT, CENTER)
        const spacePerLabel = this.getWidth() / this.labels.length
        const rectSize = new PxSize(20, min(10, this.topPadding))
        const rectPos = new PxPosition(0, (this.topPadding - rectSize.getHeight()) / 2)
        this.labels.forEach((label, index) => {
            fill(this.colors[index])
            rect(rectPos.getX(), rectPos.getY(), rectSize.getWidth(), rectSize.getHeight())
            push()
            translate(rectSize.getWidth(), this.topPadding / 2)
            label.render()
            pop()
            translate(spacePerLabel , 0)
        });
        pop()
    }
}