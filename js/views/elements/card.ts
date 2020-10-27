import {VElement} from "../../core/index"
import {Header} from "../../components/index"
import {style} from "../../sketch"
import {PxSize} from "../../layout/index"
export class Card extends VElement {
    private readonly header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(title, this.getWidth(), 100, style.text.size.xxl)
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