import VElement from "../../core/element"
import Header from "../../components/header"
import {style} from "../../sketch"
import PxSize from "../../layout/pxSize"
export default class Card extends VElement {
    #header: Header

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.#header = new Header(title, this.getWidth(), 100,style.text.size.xxl)
    }

    /**
     * @override
     */
    render() {
        this.renderBackground()
        this.#header.render()
    }

    private renderBackground() {
        noStroke()
        noFill()
        rect(0, 0, this.getWidth(), this.getHeight())
    }
}