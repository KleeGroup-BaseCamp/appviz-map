import * as p5 from "p5"
import {style} from "../../app"
import {VElement, VElementProps} from "../core"
import {ColorUtils} from "../utils"

export interface ButtonProps extends VElementProps{
    color?: p5.Color
}
export class Button extends VElement{
    private readonly color : p5.Color
    /**
     * @constructor
     * 
     */
    constructor(props: ButtonProps) {
        super(props, false)
        this.color = ColorUtils.clone(props.color ?? style.color.a)
    }

    public render(): void {
        noStroke()
        fill(this.color)
        const diameter = min(this.getWidth(), this.getHeight())
        circle(0, 0, diameter)
    }

    public contains(x: number, y: number): boolean{
        const diameter = min(this.getWidth(), this.getHeight())
        return mag(y,y) <= diameter
    }

}