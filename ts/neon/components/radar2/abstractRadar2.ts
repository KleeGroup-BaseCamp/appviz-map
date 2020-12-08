import {VText} from "../basics"
import {State, Component, ComponentProps} from "../../core"
import {PxSize } from "../../layout"
import {AnimationUtils, ColorUtils} from "../../utils"
import {neon} from "../../../appViz/app"
import {PopUp2} from "./popup2"
import {RadarData2, RadarDataSystem2} from "./radarData2"


export abstract class AbstractRadar2 extends Component{
    private readonly popUp: PopUp2
    private readonly labels: VText[] = []
    private readonly scales: VText[] = []
    private readonly textSize: number= neon.getStyle().text.size.xxs
    private readonly textMargin: number
    private readonly radius: number
    
    protected readonly radarDataSystem : RadarDataSystem2

    protected progressRatio : number = 0

    constructor(radarData: RadarData2, props: ComponentProps){
        super({...props, name: "Radar"}, false)

        for(let label in radarData){
            this.labels.push(
                new VText(
                    label, 
                    {
                        fontSize: this.textSize, 
                        fontColor: neon.getStyle().text.color.secondary
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
                        fontColor: neon.getStyle().text.color.secondary
                    } 
                )
            )
        }

        this.popUp = new PopUp2(radarData, {size: new PxSize(250, 250)}) // TO DO: change harcoded value
        textSize(this.textSize)
        textFont(neon.getStyle().text.font)
        const keys = Object.keys(radarData)
        const longestLabelWidth = Math.max(...keys.map(label => textWidth(label)))
        this.textMargin = (textAscent() + textDescent()) / 2
        this.radius = min(this.getHeight(), this.getWidth()) / 2 - longestLabelWidth - this.textMargin
        
        this.radarDataSystem = new RadarDataSystem2(radarData, this.radius)

        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, 1, duration,(s:number) => this.progressRatio = s)
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
        stroke(neon.getStyle().color.front)
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
        const dimension = this.labels.length
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
        const c = ColorUtils.clone(neon.getStyle().color.undefined)
        stroke(c)
        c.setAlpha(50)
        fill(c) 
        this.renderGraph(state)
    }

    abstract renderGraph(state: State): void
}