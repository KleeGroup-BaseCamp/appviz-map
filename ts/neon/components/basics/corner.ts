import * as p5 from "p5"
import {Component, ComponentProps} from "../../core"
import {ColorUtils} from "../../utils"


export interface CornerProps extends ComponentProps{
    color?: p5.Color
}
export class Corner extends Component{
    private readonly color : p5.Color

    constructor(props: CornerProps) {
        super(props, "Corner", false)
        this.color = ColorUtils.clone(props.color ?? this.style.color.a)
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