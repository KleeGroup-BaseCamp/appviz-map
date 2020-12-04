import {style} from "../../../app"
import {VText} from "../../components"

/**
 * Horizontal category axis
 */
export class CategoryAxis{
    private readonly labels: VText[] = []
    private readonly length: number 

    constructor(labels: string[], length: number){
        this.length = length
        this.labels = labels.map(label => new VText(label, style.text.font, style.text.size.xs, style.text.color.secondary))
    }

    public render(): void{
        stroke(style.color.front)
        line(0, 0, this.length, 0) 
        this.renderTicks()
    }

    private renderTicks(){
        const tickLength = 5
        const numOfTicks = this.labels.length
        stroke(style.color.front)
        push()
        textAlign(CENTER, TOP)
        for(let i = 0; i < numOfTicks; i++){
            line(0, tickLength / 2, 0, -tickLength / 2)
            translate(this.length  / (2 * numOfTicks), 0)
            push()
            this.labels[i].render()
            pop()
            translate(this.length  / (2 * numOfTicks), 0)
        }
        pop()
    }
}