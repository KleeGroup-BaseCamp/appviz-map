import {style} from "../../../app";
import {VElement} from "../../core";
import {PxSize} from "../../layout";
import {AnimationUtils, PushPop} from "../../utils"

export abstract class AbstractRating extends VElement{
    //How many icons are displayed ?
    private readonly icons: number  = 5

    protected rate: number

    constructor(id: any, pxSize: PxSize, rate: number){
        super(id, pxSize, false)
        this.rate = rate
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, this.icons, duration, (s:number) => this.rate = min(s,rate) )
    }

    @PushPop
    public render(){
        const margin = 3
        const size = min(this.getPxSize().getHeight(), this.getPxSize().getWidth() / this.icons - margin)
        let v = this.rate
        for(let i = 0; i < this.icons; i++){
            // square(0,0, size)
            this.renderRatingIcon(size, min(v, 1))
            v = max(v - 1, 0)
            translate(size + margin, 0)
        }
    }

    /**
     * @param size Icon's square bounding box's size
     * @param value Value displayed by icon (0 < value < 1)
     */
    private renderRatingIcon(size: number, ratio: number): void{
        //value must be in (0 ; 0.5; 1)     

        //1. Dispay a full grey icon 
        if (ratio !==1){
            noStroke()
            fill(style.color.front)
            this.renderIcon(size, false, 1)
        }

        //2. Dispay an active icon (full or half on the left)  
        if (ratio >0){
            noStroke()
            this.renderIcon(size, true, ratio)
        }
    }

    abstract renderIcon(size : number, active : boolean, ratio : number):void
}