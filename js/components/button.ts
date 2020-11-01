import * as p5 from "p5"
import {Component}  from "./component"

export class Button implements Component{
    private readonly xo: number
    private readonly yo: number
    private readonly color : p5.Color
    private readonly diameter : number
    /**
     * @constructor
     * 
     */
    constructor(xo: number, yo: number, color: p5.Color, diameter : number) {
        this.xo = xo,
        this.yo = yo
        this.color = color
        this.diameter = diameter
    }

    public render(): void {
        noStroke()
        fill(this.color)
        circle(this.xo, this.yo, this.diameter)
    }

    public contains(x: number, y: number): boolean{
        const vx = x -this.xo
        const vy = y- this.yo          
        return vx*vx + vy*vy <= this.diameter*this.diameter
    }

}