import * as p5 from "p5"
import {VText} from "../basics"
import {Component, ComponentProps} from "../../core"
import {PxSize} from "../../layout"

type DonutData = {label: string, value: number}[]

export class DonutChart extends Component{
    private readonly colors: p5.Color[] = [this.style.color.a, this.style.color.b, this.style.color.c, this.style.color.d]
    private readonly data: DonutData
    private readonly labels: VText[] = []
    private readonly topPadding: number = 20

    constructor(data: DonutData, props: ComponentProps){
        super(props, "DonutChart", false)
        this.data = data
        this.data.map(
            entry => this.labels.push(
                new VText(
                    entry.label, 
                    {
                        fontSize: this.style.text.size.xs
                    }
                )
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
        fill(this.style.color.back)
        const cutOutPercentage = 0.5
        circle(0, 0, radius * 2 * cutOutPercentage) 
    }

    private renderLegend(): void{
        push()
        textAlign(LEFT, CENTER)
        const spacePerLabel = this.getWidth() / this.labels.length
        const rectSize = new PxSize(20, min(10, this.topPadding))
        const rectPos = createVector(0, (this.topPadding - rectSize.getHeight()) / 2)
        this.labels.forEach((label, index) => {
            fill(this.colors[index])
            rect(rectPos.x, rectPos.y, rectSize.getWidth(), rectSize.getHeight())
            push()
            translate(rectSize.getWidth(), this.topPadding / 2)
            label.render()
            pop()
            translate(spacePerLabel , 0)
        });
        pop()
    }
}