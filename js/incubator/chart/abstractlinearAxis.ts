import {style} from "../../app"
import {VText} from "../../components"

export abstract class AbstractLinearAxis{
    protected readonly min: number
    protected readonly max: number
    protected readonly labels: VText[] = []
    protected readonly numOfTicks = 5

    constructor(min: number, max: number){
        this.min = min
        this.max = max
        const diff = max - min
        for(let i = 0; i < this.numOfTicks; i++){
            const text = (min + Math.floor(diff * i / this.numOfTicks)).toString()
            this.labels.push(new VText(text, style.text.font, style.text.size.xs, style.text.color.secondary))
        }
    }

    public abstract render(): void
    
    /**
     * Get the coordinate (x or y) for a given value
     * @param value 
     */
    public abstract getCoorForValue(value: number): number


}