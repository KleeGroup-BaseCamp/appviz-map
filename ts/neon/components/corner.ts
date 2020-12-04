import * as p5 from "p5"
import {Component}  from "./component"

export class Corner implements Component{
    private readonly width: number
    private readonly height: number
    private readonly color : p5.Color

    /**
     * @constructor
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {p5.Color} color 
     */
    constructor(width: number, height: number, color: p5.Color) {
        this.width = width,
        this.height = height
        this.color = color
    }

    public render(): void {
        stroke(this.color)
        fill(this.color)

        beginShape();
        vertex(0, 0);
        vertex(this.width, 0);
        vertex(0, this.height);
        endShape(CLOSE);
    }
}