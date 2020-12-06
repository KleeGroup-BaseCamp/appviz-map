import * as p5 from "p5"
import {Component}  from "./component"

export class Button implements Component{
    private readonly color : p5.Color
    private readonly diameter : number
    /**
     * @constructor
     * 
     */
    constructor(color: p5.Color, diameter : number) {
        this.color = color
        this.diameter = diameter
    }

    public render(): void {
        noStroke()
        fill(this.color)
        circle(0, 0, this.diameter)
    }

    public contains(x: number, y: number): boolean{
        return mag(y,y) <= this.diameter
    }

}