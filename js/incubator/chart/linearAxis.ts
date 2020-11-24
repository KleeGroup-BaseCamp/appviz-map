import { style } from "../../app"
import { VText } from "../../components"

export abstract class LinearAxis{
    private readonly min: number
    private readonly max: number
    protected readonly labels: VText[] = []
    protected readonly numOfTicks = 5

    constructor(min: number, max: number){
        this.min = min
        this.max = max
        const diff = max - min
        for(let i = 0; i < this.numOfTicks; i++){
            const text = Math.floor(diff * i / this.numOfTicks).toString()
            this.labels.push(new VText(text, style.text.font, style.text.size.s))
        }
    }

    public abstract render(): void
}