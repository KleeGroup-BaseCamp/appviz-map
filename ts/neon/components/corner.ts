import * as p5 from "p5"
import {style} from "../../app"
import {VElement, VElementProps} from "../core"
import {ColorUtils} from "../utils"


export interface CornerProps extends VElementProps{
    color?: p5.Color
}
export class Corner extends VElement{
    private readonly color : p5.Color

    constructor(props: CornerProps) {
        super(props, false)
        this.color = ColorUtils.clone(props.color ?? style.color.a)
    }

    public render(): void {
        stroke(this.color)
        fill(this.color)

        beginShape();
        vertex(0, 0);
        vertex(this.getWidth(), 0);
        vertex(0, this.getHeight());
        endShape(CLOSE);
    }
}