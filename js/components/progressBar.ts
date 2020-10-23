import VText from "./vtext"
import AnimationUtils from "../utils/animationUtils"
import {style} from "../sketch"
import * as p5 from "p5"

export default class ProgressBar {
    #value: number
    #maxValue: number
    #width: number
    #color: p5.Color
    #title: VText // TO DO: Use better name (e.g title is also used for string field in other objects (i.e. Header))

    constructor(value: number, maxValue: number, width: number, color: p5.Color) {
        this.#value = value
        this.#maxValue = maxValue
        this.#width = width
        this.#color = color
        this.#title = new VText("", style.text.font, style.text.size.s)
        const duration = 300 /*ms*/
        AnimationUtils.animate(0, value, duration, s => this.#value = s)
    }
    
    render() {
        const weight = 8
        this.#title.setText(Math.floor(this.#value).toString())
        this.#title.render() 
        push()
        translate(20, (-textAscent() + weight) / 2 )
        this.renderBar(weight);
        pop()
    }

    private renderBar(weight: number){
        strokeJoin(ROUND)
        
        strokeWeight(weight)
        stroke(style.color.front)
        line(0, 0, this.#width, 0)
        
        stroke(this.#color)
        const size = this.#value * this.#width / this.#maxValue  
        line(0, 0, size, 0)
    }
}