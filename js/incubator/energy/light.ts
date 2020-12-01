import * as p5 from "p5"
import {style} from "../../app"
import {VElement} from "../../core"
import {PxPosition, PxSize} from "../../layout"
import {AnimationUtils, PushPop} from "../../utils"

export class Light extends VElement{
    private readonly radius: number
    
    private color : p5.Color = color('gold')
    private value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        this.radius = min(pxSize.getHeight(), pxSize.getWidth())
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public withColor(color : p5.Color): Light{
        this.color = color
        return this
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
        stroke(style.color.back)
        circle(0, 0,  this.radius - weight) 
        strokeWeight(2)
        stroke(style.text.color.primary)
        circle(0, 0,  this.radius) 
    }
}