import {n3on} from "../.."
import {VText} from "../basics"

/**
 * Horizontal category axis
 */
export class CategoryAxis{
    private readonly labels: VText[] = []
    private readonly length: number 

    constructor(labels: string[], length: number){
        this.length = length
        this.labels = labels.map(
            label => new VText(
                label, 
                {
                    fontSize: n3on.getStyle().text.size.xs, 
                    fontColor: n3on.getStyle().text.color.secondary
                }
            )
        )
    }

    public render(): void{
        stroke(n3on.getStyle().color.front)
        line(0, 0, this.length, 0) 
        this.renderTicks()
    }

    private renderTicks(){
        const tickLength = 5
        const numOfTicks = this.labels.length
        stroke(n3on.getStyle().color.front)
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