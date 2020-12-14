import {Style, StyleBuilder, ThemeName} from "./style"

export class Neon{
    private style? : Style
    private styleBuilder : StyleBuilder
    private debug: boolean = true

    constructor(){
        this.styleBuilder = new StyleBuilder()
    }

    public load(){
        this.styleBuilder.load()
    }

    public getStyle(): Style{
        if (!this.style){
            //Lazy loading
            this.style = this.styleBuilder.build()
        }
        return this.style
    }
    
    public getDebug(): boolean{
        return this.debug
    }

    public setDebug(value: boolean): void{
        this.debug = value
    }

    public setTheme(themeName: ThemeName): void{
        this.style = this.styleBuilder
            .withTheme(themeName)
            .build()
    }
}

export const n3on = new Neon()
