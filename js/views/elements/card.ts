import {style} from "../../app"
import {VElement, State} from "../../core"
import {Header} from "../../components"
import {PxSize} from "../../layout"

export class Card extends VElement {
    private readonly header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(title, this.getWidth(), 100, style.text.size.xxl)
    }

    /**
     * @override
     */
    public render(state :State): void  {
        this.renderBackground()
        this.header.render()
    }

    private renderBackground(): void {
        noStroke()
        noFill()
        rect(0, 0, this.getWidth(), this.getHeight())
    }

    public needsClear():boolean {
        return false
    }
}