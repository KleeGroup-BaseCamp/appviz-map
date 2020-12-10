import * as p5 from "p5"
import {Component, State, ComponentProps, ColorUtils, PxSize, Header, Corner} from "../../neon"

export interface ZoneProps extends ComponentProps{
    color?: p5.Color
}

/**
 * View of a zone.
 */
export class Zone extends Component {
    private readonly header: Header
    private readonly corner: Corner

    constructor(title: string, props: ZoneProps) {
        super(props, "Zone", false)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 50),
                fontSize: this.style.text.size.l 
            }
        )
        this.corner = new Corner(
            {
                size: new PxSize(30, 30),
                color: ColorUtils.clone(props.color ?? this.style.color.a)
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