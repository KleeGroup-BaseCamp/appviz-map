import {VText} from "../basics"
import {Component, ComponentProps} from "../../core"
import {PxSize } from "../../layout"
import {AbstractRating } from "../rating/abstractRating"
import {StarRating } from "../rating/starRating"
import {ColorUtils} from "../../utils"
import {RadarData2} from "./RadarData2"
import {n3on} from "../.."

export class PopUp2 extends Component{
    private readonly ratings: AbstractRating[] = []
    private readonly labels: VText[] = []
    private readonly size: number
    private readonly padding: number

    constructor(value: RadarData2, props: ComponentProps){
        super(props, "PopUp2", false)
        this.padding = 10
        this.size = n3on.getStyle().text.size.xs
        textSize(this.size)
        for(let label in value){
            const text = `${label}:`
            const width = textWidth(text)
            this.labels.push(new VText(text, {fontSize: this.size}))
            const size = new PxSize(this.getWidth() - 3 * this.padding - width, textAscent() + textDescent())  
            this.ratings.push(
                new StarRating(
                    value[label] / 20,  // -> [0, 5]
                    {size, }
                    )
            )

        }
    }

    render(): void{
        this.renderPopUp()
        this.renderContent()
    } 
 
    renderPopUp(): void{
        noStroke()
        const c = ColorUtils.clone(n3on.getStyle().color.a)
        c.setAlpha(150)
        fill(c)
        rect(0, 0, this.getPxSize().getWidth(), this.getPxSize().getHeight())
    } 
 
    renderContent(): void{        
        noStroke()
        fill(n3on.getStyle().text.color.primary)
        textSize(this.size)
        textAlign(LEFT, TOP)
        const maxLabelwidth = Math.max(...this.labels.map(label => textWidth(label.getText()))) // CC constructor --> Make utils method ?
        const height = this.ratings[0].getPxSize().getHeight()
        for(let i = 0; i < this.labels.length; i++){
            push()
            translate(this.padding, this.padding + (height + this.padding) * i, )
            this.labels[i].render()
            translate(maxLabelwidth + this.padding, 0)
            this.ratings[i].render()
            pop()
        }
    }
}    