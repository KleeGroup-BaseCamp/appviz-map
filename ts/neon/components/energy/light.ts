import * as p5 from "p5"
import {neon} from "../../../app"
import {Component, ComponentProps} from "../../core"
import {AnimationUtils, ColorUtils, PushPop} from "../../utils"

export interface LightProps extends ComponentProps{
    color?: p5.Color
}

export class Light extends Component{
    private readonly radius: number
    private readonly color : p5.Color

    private value: number

    constructor(value: number, props: LightProps){
        super(props, false)
        this.value = value
        this.color = ColorUtils.clone(props.color ?? color('gold'))
        this.radius = min(this.getHeight(), this.getWidth())
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition.getX(), this.centerPosition.getY()) 

        noFill()
        const maxOpacity = this.value * 255 / 100
        for(let r = 0; r < this.radius; r++){
            const opacity = maxOpacity* (1 - r / this.radius)
            this.color.setAlpha(opacity)
            stroke(this.color)
            circle(0, 0, r)
        }
        smooth()
        const weight =2
        strokeWeight(4*weight)
        stroke(neon.getStyle().color.back)
        circle(0, 0,  this.radius - weight) 
        strokeWeight(2)
        stroke(neon.getStyle().text.color.primary)
        circle(0, 0,  this.radius) 
    }
}