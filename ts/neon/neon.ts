import {Style, StyleBuilder, ThemeName} from "./components"

export class Neon{
    private style? : Style // Have a default style ?
    private styleBuilder : StyleBuilder
    private debug: boolean = true

    constructor(){
        this.styleBuilder = new StyleBuilder()
    }

    public load(){
        this.styleBuilder.load()
    }

    public buildStyle(){
      this.style = this.styleBuilder.build()
    }

    public getStyle(): Style{
        if (!this.style){
            throw "style is undefined"
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
        this.style = new StyleBuilder()
            .withTheme(themeName)
            .build()
    }
}

export const n3on = new Neon()
