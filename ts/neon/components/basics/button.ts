import * as p5 from "p5"
import {neon} from "../../../app"
import {Component, ComponentProps} from "../../core"
import {ColorUtils} from "../../utils"

export interface ButtonProps extends ComponentProps{
    color?: p5.Color
}
export class Button extends Component{
    private readonly color : p5.Color
    /**
     * @constructor
     * 
     */
    constructor(props: ButtonProps) {
        super(props, false)
        this.color = ColorUtils.clone(props.color ?? neon.getStyle().color.a)
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