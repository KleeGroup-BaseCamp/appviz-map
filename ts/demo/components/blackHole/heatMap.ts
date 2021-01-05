import {Component, ComponentMouseMoved, ComponentProps} from "../../../neon/core"
import {PushPop} from "../../../neon/utils"

export class HeatMap extends Component implements ComponentMouseMoved{
    private readonly grid : number[][] = []
    private readonly points : number = 50

    constructor( props: ComponentProps){
        super(props, "Card", true)
        for (let i=0; i<this.points; i++){
            this.grid[i] = []
            for (let j=0; j<this.points; j++){
               this.grid[i][j] = 0        
            }
        }
    }
    
    public onMouseMoved(x:number, y:number){
        const i = round(this.points*x/this.getWidth())
        const j = round(this.points*y/this.getHeight())
        this.grid[i][j] = this.grid[i][j] +5  
    }

    @PushPop
    public render() : void {
        for (let i=0; i<this.points; i++){
            for (let j=0; j<this.points; j++){
                fill('blue')
                const d = this.grid[i][j]
                circle(i * this.getWidth() /this.points, j*this.getHeight()/this.points, d)        
            }    
        }
    }    
    public needsClear ():boolean {
        return false
    }
}
