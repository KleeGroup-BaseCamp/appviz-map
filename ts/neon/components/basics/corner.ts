import * as p5 from "p5"
import {neon} from "../../../appViz/app"
import {Component, ComponentProps} from "../../core"
import {ColorUtils} from "../../utils"


export interface CornerProps extends ComponentProps{
    color?: p5.Color
}
export class Corner extends Component{
    private readonly color : p5.Color

    constructor(props: CornerProps) {
        super(props, "", false)
        this.color = ColorUtils.clone(props.color ?? neon.getStyle().color.a)
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