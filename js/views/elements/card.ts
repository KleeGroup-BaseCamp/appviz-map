import {style} from "../../sketch"
import {VElement} from "../../core"
import {Header} from "../../components"
import {PxSize} from "../../layout"
export class Card extends VElement {
    private header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(title, this.getWidth(), 100,style.text.size.xxl)
    }

    /**
     * @override
     */
    public render(): void  {
        this.renderBackground()
        this.header.render()
    }

    private renderBackground(): void {
        noStroke()
        noFill()
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}