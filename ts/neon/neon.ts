import {Style} from "./components"

export class Neon{
    private readonly style : Style
    private debug: boolean = true

    constructor(style: Style){
        this.style = style
    }

    public getStyle(): Style{
        return this.style
    }
    
    public getDebug(): boolean{
        return this.debug
    }

    public setDebug(value: boolean): void{
        this.debug = value
    }

}


