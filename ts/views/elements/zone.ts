/**
 * View of a zone.
 */
import * as p5 from "p5"
import {style} from "../../app"
import {VElement, State, VElementProps, ColorUtils, PxSize} from "../../neon"
import {Header, Corner} from "../../neon"

export interface ZoneProps extends VElementProps{
    color?: p5.Color
}

export class Zone extends VElement {
    private readonly header: Header
    private readonly corner: Corner

    constructor(title: string, props: ZoneProps) {
        super(props, false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 50),
                fontSize: style.text.size.l 
            }
        )
        this.corner = new Corner(
            {
                size: new PxSize(30, 30),
                color: ColorUtils.clone(props.color ?? style.color.a)
            }
        )
    }

    /**
     * @override
     */
    public render(state : State): void {
        // this.renderBackground()
        this.header.render()
        this.corner.render()
   }

/*    renderBackground() {
        noStroke()
        noFill()
        rect(0, 0, this.width, this.height)
    }
*/
 }