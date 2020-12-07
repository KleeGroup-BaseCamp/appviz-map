import {VText} from "../../components"
import {VElement2, VElementProps} from "../../core"
import {PxSize } from "../../layout"
import {style} from "../../../app"
import {AbstractRating } from "../rating/abstractRating"
import {StarRating } from "../rating/starRating"
import {ColorUtils} from "../../utils"
import {RadarData} from "./abstractRadar"

export class PopUp extends VElement2{
    private readonly ratings: AbstractRating[] = []
    private readonly labels: VText[] = []
    private readonly size: number
    private readonly padding: number

    constructor(data: RadarData, props: VElementProps){
        super(props, false)
        this.padding = 10
        this.size = style.text.size.xs
        textSize(this.size)
        for(let label in data){
            const text = `${label}:`
            const width = textWidth(text)
            this.labels.push(new VText(text, style.text.font, this.size))
            const size = new PxSize(this.getWidth() - 3 * this.padding - width, textAscent() + textDescent())  
            this.ratings.push(
                new StarRating(
                    data[label] / 20,  // -> [0, 5]
                    {size}
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
        const c = ColorUtils.clone(style.color.a)
        c.setAlpha(150)
        fill(c)
        rect(0, 0, this.getPxSize().getWidth(), this.getPxSize().getHeight())
    } 
 
    renderContent(): void{        
        noStroke()
        fill(style.text.color.primary)
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